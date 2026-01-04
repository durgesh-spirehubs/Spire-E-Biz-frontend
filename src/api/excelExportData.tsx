import axiosServices from "@/lib/axios";

export function exportReportPurchaseOrder() {
  return axiosServices.get(
    "/api/orders/exportExcelOrdersFile",
    {
      responseType: "blob"
    }
  );
}