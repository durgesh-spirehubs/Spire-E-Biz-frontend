"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { SelectColumn } from "@/components/common/SelectColumn";
import DataTable from "@/components/common/table/DataTable";
import { Column } from "@/components/common/table/types";
import { TabList } from "@/components/common/TabList";
import MainCard from "@/components/dashboard/main-card";
import { Button } from "@/components/ui/button";
import Iconify from "@/components/ui/iconify";
import { getTransactionsList } from "@/api/transactions";
import { FilterColumn } from "@/components/common/FilterColumn";

interface Transactions {
  id: number;
  transactionId: string;
  userId: any;
  packageId: string;
  paidAmount: number;
}

const TransactionsList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<Transactions[]>([]);
  const [data, setData] = useState<Transactions[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const pageLimit = 10;

  const allColumns: Column<Transactions>[] = [
    {
      header: "Transaction ID",
      accessor: "transactionId",
      isVisible: true,
    },
    {
      header: "Customer",
      accessor: "userId",
      isVisible: true,
    },
    {
      header: "Package",
      accessor: "packageId",
      isVisible: true,
    },
    {
      header: "Paid Amount",
      accessor: "paidAmount",
      isVisible: true,
    },
  ];

  const [columns, setColumns] = useState(allColumns);

  const actions = [
    {
      label: "View",
      icon: (
        <Iconify
          icon="carbon:view"
          width={22}
          height={22}
          className="text-primary"
        />
      ),
      onClick: (row: Transactions) => handleViewDetails(row),
    },
  ];

  const fetchTransactionsList = () => {
    const query = `?search=${searchValue}&page=${currentPage}&limit=${pageLimit}`;
    setIsFetching(true);
    getTransactionsList(query)
      .then((res: any) => {
        setData(res?.data);
        const total = res?.total;
        setTotalPages(Math.ceil(total / pageLimit));
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchTransactionsList();
  }, [searchValue, currentPage]);

  const handleViewDetails = (row: Transactions) => {
    router.push(`transactions/${row?.id}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
    setCurrentPage(page);
  };

  const handleSelectRows = (rows: Transactions[]) => {
    setSelectedRows(rows);
  };

  const handleSort = (
    column: keyof Transactions,
    direction: "asc" | "desc"
  ) => {
    console.log(`Sort by ${column} in ${direction} order`);
  };

  const handleFilter = (column: keyof Transactions, filterValue: string) => {
    console.log(`Filter by ${column} with value ${filterValue}`);
  };

  const tabValue: string | any[] = [];

  const TableSearchFilter = () => (
    <div className="flex gap-2 items-center justify-between py-2">
      <input
        type="text"
        placeholder="Search here"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="mt-1 py-2 px-2 border border-gray-300 rounded text-sm font-normal min-w-64"
        autoFocus
      />
      <div className="flex gap-2">
        <FilterColumn columns={columns} setColumns={setColumns} />
        <Button variant="outline" className="gap-1">
          <Iconify icon="ph:export" width={18} height={18} /> Export
        </Button>
        <SelectColumn columns={columns} setColumns={setColumns} />
      </div>
    </div>
  );

  return (
    <MainCard title="Transactions" description="View Transactions List">
      {tabValue?.length > 0 && (
        <div className="bg-background rounded">
          <TabList tabValue={tabValue} />
        </div>
      )}
      {selectedRows.length > 0 ? (
        <div className="flex gap-2 items-center justify-between py-2">
          <p className="text-md font-bold text-primary">
            You have selected {selectedRows.length} row(s)
          </p>
          <Button
            size="sm"
            variant="outline"
            className="text-red-500 hover:text-red-500 border-red-500 hover:border-red-500"
          >
            Delete
          </Button>
        </div>
      ) : (
        <TableSearchFilter />
      )}
      <DataTable
        columns={columns}
        data={data}
        actions={actions}
        onSort={handleSort}
        onFilter={handleFilter}
        isCheckbox={true}
        onSelect={handleSelectRows}
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

TransactionsList.routePermission = ["Admin", "Customers"];
export default TransactionsList;
