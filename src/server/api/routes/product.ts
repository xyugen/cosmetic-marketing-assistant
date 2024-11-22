import { type SalesByProductData } from "@/interface/SalesByProductData";
import { productTransactions } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import papa from "papaparse";
import { zfd } from "zod-form-data";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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

      if (!file.type.startsWith("text/csv")) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File must be a CSV file",
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
        "Memo Description",
      ];

      let headerValidationDone = false;
      const invalidRows: string[] = [];

      papa.parse<SalesByProductData>(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        step: (row, parser) => {
          const rowData = row.data;

          // Validate headers only once
          if (!headerValidationDone) {
            const fileHeaders = Object.keys(rowData);
            const missingHeaders = requiredHeaders.filter(
              (header) => !fileHeaders.includes(header),
            );

            if (missingHeaders.length > 0) {
              parser.abort();
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: `Missing required headers: ${missingHeaders.join(", ")}`,
              });
            }
            headerValidationDone = true;
          }

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

          // Process valid row
          try {
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
          } catch (error) {
            if (error instanceof Error) {
              console.error("Error inserting row:", error);
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: error.message,
              });
            }
          }
        },
        complete: () => {
          if (invalidRows.length > 0) {
            console.warn(
              `Parsing completed with ${invalidRows.length} invalid rows skipped.`,
            );
          } else {
            console.log("CSV parsing completed successfully with no issues.");
          }
        },
        error: (error: Error) => {
          console.error("Error parsing CSV:", error);
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message || "Error parsing CSV",
          });
        },
      });

      return {
        success: true,
        message: `CSV uploaded successfully. ${invalidRows.length} invalid rows were skipped.`,
      };
    }),
});