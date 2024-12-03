import type { SalesByProductData } from "@/interface/SalesByProductData";
import { productTransactions } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import papa from "papaparse";
import type * as schema from "@/server/db/schema";

export const parseCsvAndUpdateDb = async (
  csvText: string,
  db: LibSQLDatabase<typeof schema>,
) => {
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

  await new Promise<void>((resolve, reject) => {
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
          void db
            .insert(productTransactions)
            .values({
              transactionNumber: rowData["Transaction No"],
              type: rowData["Transaction Type"],
              date: new Date(rowData.Date),
              productService: rowData["Product/Service"].replace(
                "(deleted)",
                "",
              ),
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
              message: error instanceof Error ? error.message : "Unknown error",
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

  return invalidRows;
};
