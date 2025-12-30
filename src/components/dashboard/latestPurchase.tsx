"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import DataTable from "@/components/common/table/DataTable";
import { Column } from "@/components/common/table/types";
import MainCard from "@/components/dashboard/main-card";
import { Button } from "@/components/ui/button";
import Iconify from "@/components/ui/iconify";
import { SelectColumn } from "@/components/common/SelectColumn";
import { FilterColumn } from "@/components/common/FilterColumn";
import axiosServices from "@/lib/axios";
interface PurchaseOrder {
  id: number;
  genratePurchaseOrderId: string;
  service_type: string;
  supplier_id: string;
  total_items: number;
  overallPrice: number;
  estimatedDeliveryDate: string;
  purchaseOrderStatus: string;
  status: string;
}
const LatestPurchaseOrders = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get("page")) || 1;
  const pageLimit = 5;

  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<PurchaseOrder[]>([]);
  const [selectedRows, setSelectedRows] = useState<PurchaseOrder[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const handleStatusChange = async (id: number, status: string) => {
    try {
      await axiosServices.patch(`/api/items-purchase-orders/${id}`, { status });
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status } : item
        )
      );
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };
  const allColumns: Column<PurchaseOrder>[] = [
    {
      header: "PO ID",
      accessor: "genratePurchaseOrderId",
      isVisible: true,
    },
    {
      header: "Service Type",
      accessor: "service_type",
      isVisible: true,
    },
    {
      header: "Supplier",
      accessor: "supplier_id",
      isVisible: true,
    },
    {
      header: "Items",
      accessor: "total_items",
      isVisible: true,
    },
    {
      header: "Price",
      accessor: "overallPrice",
      isVisible: true,
      render: (value, row) => (
        <p>
          {row?.overallPrice}
        </p>
      ),
    },
    {
      header: "Delivery Date",
      accessor: "estimatedDeliveryDate",
      isVisible: true,
            render: (value, row) => (
        <p>
          {row?.estimatedDeliveryDate}
        </p>
      ),
    },
    {
      header: "PO Status",
      accessor: "purchaseOrderStatus",
      isVisible: true,
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            value === "Approved"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      isVisible: true,
      render: (value, row) => (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={value === "Active"}
            onChange={() =>
              handleStatusChange(
                row.id,
                value === "Active" ? "Inactive" : "Active"
              )
            }
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition">
            <div className="w-5 h-5 bg-white rounded-full mt-0.5 ml-0.5 peer-checked:translate-x-5 transition-transform" />
          </div>
        </label>
      ),
    },
  ];
  const [columns, setColumns] = useState(allColumns);
  const actions = [
    {
      label: "View",
      icon: <Iconify icon="mdi:eye" width={22} height={22} />,
      onClick: (row: PurchaseOrder) =>
        router.push(`/purchase-orders/${row.id}`),
    },
  ];
  const fetchPurchaseOrders = () => {
    const query = `?search=${searchValue}&page=${currentPage}&limit=${pageLimit}`;
    setIsFetching(true);
    axiosServices
      .get(`/api/items-purchase-orders${query}`)
      .then((res) => {
        setData(res.data.data);
        setTotalPages(Math.ceil(res.data.total / pageLimit));
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setIsFetching(false));
  };

  useEffect(() => {
    fetchPurchaseOrders();
  }, [searchValue, currentPage]);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
    setCurrentPage(page);
  };

  const TableSearchFilter = () => (
    <div className="flex justify-between gap-2 py-2">
      <input
        type="text"
        placeholder="Search purchase orders"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="border rounded px-3 py-2 text-sm min-w-64"
      />
      {/* <div className="flex gap-2">
        <FilterColumn columns={columns} setColumns={setColumns} />
        <SelectColumn columns={columns} setColumns={setColumns} />
      </div> */}
    </div>
  );
  return (
    <MainCard
      title="Purchase Orders"
      description="View Purchase Order List"
    >
      {selectedRows.length > 0 ? (
        <p className="py-2 text-primary font-semibold">
          Selected {selectedRows.length} row(s)
        </p>
      ) : (
        <TableSearchFilter />
      )}

      <DataTable
        columns={columns}
        data={data}
        actions={actions}
        isCheckbox
        onSelect={setSelectedRows}
        isFetching={isFetching}
        pagination={{
          currentPage,
          pageSize: pageLimit,
          totalPages,
          onPageChange: handlePageChange,
        }}
      />
    </MainCard>
  );
};

LatestPurchaseOrders.routePermission = ["Admin", "PurchaseOrders"];
export default LatestPurchaseOrders;
