import { type SalesByProductData } from "@/interface/SalesByProductData";
import { TRPCError } from "@trpc/server";
import papa from "papaparse";
import { zfd } from "zod-form-data";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  uploadCSV: protectedProcedure
    .input(
      zfd.formData({
        name: zfd.text(),
        file: zfd.file(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name: fileName, file } = input;

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

      papa.parse<SalesByProductData>(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        transform: (value, field) => {
          if (field === "Date") {
            const date = new Date(value);
            return isNaN(date.getTime()) ? null : date;
          }
          return value;
        },
        step: (row) => {
          const rowData = row.data;

          if (!rowData.Date || !rowData["Transaction No"]) {
            console.warn(
              "Skipping row due to missing Date or Transaction No."
            );
            return;
          };

          console.log("Row data:", rowData);
        },
        complete: () => {
          // 
        },
        error: (error: Error) => {
          console.error("Error parsing CSV:", error);
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message || "Error parsing CSV",
          });
        },
      });
    }),
});
