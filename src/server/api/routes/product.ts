import { type SalesByProductData } from "@/interface/SalesByProductData";
import { productTransactions } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import papa from "papaparse";
import { zfd } from "zod-form-data";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { createProductTransactionSchema } from "@/app/(app)/transactions/create/_components/schema";
import { syncCustomerTable } from "@/lib/api/sync-customer-table";

export const productRouter = createTRPCRouter({
  uploadCSV: protectedProcedure
    .input(
      zfd.formData({
        file: zfd.file(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { file } = input;

      if (!file) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No file uploaded",
        });
      }

      if (!file.name.endsWith(".csv")) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File must be a CSV file. File type: " + file.type,
        });
      }

      const csvText = await file.text();

      const requiredHeaders = [
        "Transaction No",
        "Transaction Type",
        "Date",
        "Product/Service",
        "Customer",
        "Quantity",
        "Sales Price",
        "Amount",
        "Balance",
        "Memo/Description",
      ];

      const invalidRows: string[] = [];

      const parseCSV = () =>
        new Promise<void>((resolve, reject) => {
          let headerValidationDone = false;

          papa.parse<SalesByProductData>(csvText, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            step: (row, parser) => {
              const rowData = row.data;

              try {
                // Validate headers only once
                if (!headerValidationDone) {
                  const fileHeaders = Object.keys(rowData);
                  const missingHeaders = requiredHeaders.filter(
                    (header) => !fileHeaders.includes(header),
                  );

                  if (missingHeaders.length > 0) {
                    parser.abort();
                    return reject(
                      new TRPCError({
                        code: "BAD_REQUEST",
                        message: `Missing required headers: ${missingHeaders.join(", ")}`,
                      }),
                    );
                  }
                  headerValidationDone = true;
                }

                // Validate row data
                if (
                  !rowData["Transaction No"] ||
                  !rowData.Date ||
                  isNaN(Number(rowData.Quantity)) ||
                  isNaN(Number(rowData["Sales Price"])) ||
                  isNaN(Number(rowData.Amount)) ||
                  isNaN(Number(rowData.Balance))
                ) {
                  invalidRows.push(JSON.stringify(rowData));
                  return; // Skip invalid row
                }

                // Insert valid row into the database
                void ctx.db
                  .insert(productTransactions)
                  .values({
                    transactionNumber: rowData["Transaction No"],
                    type: rowData["Transaction Type"],
                    date: new Date(rowData.Date),
                    productService: rowData["Product/Service"],
                    customer: rowData.Customer,
                    quantity: Number(rowData.Quantity),
                    salesPrice: Number(rowData["Sales Price"]),
                    amount: Number(rowData.Amount),
                    balance: Number(rowData.Balance),
                    description: rowData["Memo Description"],
                  })
                  .execute();

                console.log("Inserted a row successfully:", rowData);
              } catch (error) {
                console.error("Error processing row:", error);
                return reject(
                  new TRPCError({
                    code: "BAD_REQUEST",
                    message:
                      error instanceof Error ? error.message : "Unknown error",
                  }),
                );
              }
            },
            complete: () => {
              console.log(
                invalidRows.length > 0
                  ? `Parsing completed with ${invalidRows.length} invalid rows skipped.`
                  : "CSV parsing completed successfully.",
              );
              resolve();
            },
            error: (error: Error) => {
              console.error("Error parsing CSV:", error);
              reject(
                new TRPCError({
                  code: "BAD_REQUEST",
                  message: error.message || "Error parsing CSV",
                }),
              );
            },
          });
        });

      // Execute CSV parsing
      await parseCSV();
      await syncCustomerTable(new Date());

      return {
        success: true,
        message: `CSV uploaded successfully. ${invalidRows.length} invalid rows were skipped.`,
      };
    }),
  getProductTransactions: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.db
      .select({
        transactionNumber: productTransactions.transactionNumber,
        type: productTransactions.type,
        date: productTransactions.date,
        productService: productTransactions.productService,
        customer: productTransactions.customer,
        quantity: productTransactions.quantity,
        salesPrice: productTransactions.salesPrice,
        amount: productTransactions.amount,
        balance: productTransactions.balance,
        description: productTransactions.description,
      })
      .from(productTransactions)
      .orderBy(productTransactions.date);

    return transactions;
  }),
  createProductTransaction: protectedProcedure
    .input(createProductTransactionSchema.extend({ balance: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const [transactionId] = await ctx.db
          .insert(productTransactions)
          .values({
            transactionNumber: input.transactionNumber,
            type: input.type,
            date: input.date,
            productService: input.productService,
            customer: input.customer,
            quantity: input.quantity,
            salesPrice: input.salesPrice,
            amount: input.amount,
            balance: input.balance,
            description: input.description,
          })
          .returning({ id: productTransactions.id })
          .execute();
        
        await syncCustomerTable(new Date(input.date));

        return {
          message: "Transaction created successfully.",
          id: transactionId,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }
      }
    }),
});
