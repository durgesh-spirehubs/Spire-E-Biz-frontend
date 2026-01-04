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
import { deleteCustomer, getCustomersList } from "@/api/customer";
import { FilterColumn } from "@/components/common/FilterColumn";
import axiosServices from "@/lib/axios";
import { exportReportPurchaseOrder } from "@/api/excelExportData";

interface User {
  id: number;
  name: string;
  businessName: string;
  first_name: string;
  businessTypeDetails: any;
  email_address: string;
  phone_number: string;
  currentPackage: string;
  role: string;
  status: string;
}

const Customers = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [data, setData] = useState<User[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const pageLimit = 5;
  const handleStatusChange = async (id: number, status: string) => {
  try {
       await axiosServices.patch(`/api/customers/${id}`,{
        status
       })
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
    toast.success(`Status set to ${status}`);
  } catch (error) {
    toast.error("Failed to update status");
  }
};

  const allColumns: Column<User>[] = [
    {
      header: "Contact Person",
      accessor: "first_name",
      isVisible: true,
    },
    {
      header: "Email ID",
      accessor: "email_address",
      isVisible: true,
      render: (value, row) => (
        <p>
          {row?.email_address}
        </p>
      ),
    },
      {
      header: "Phone Number",
      accessor: "phone_number",
      isVisible: true,
      render: (value, row) => (
        <p>
          {row?.phone_number}
        </p>
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
            value === "Active" ? "InActive" : "Active"
          )
        }
      />
      <div
        className="
          w-11 h-6 
          bg-gray-300 
          peer-focus:outline-none 
          rounded-full 
          peer 
          peer-checked:bg-blue-500
          transition-colors
        "
      >
        <div
          className="
            absolute top-0.5 left-0.5
            w-5 h-5
            bg-white
            rounded-full
            transition-transform
            peer-checked:translate-x-5
          "
        />
      </div>
       <div
  >

  </div>

    </label>
  ),
},
  ];
  const [columns, setColumns] = useState(allColumns);
  const actions = [
     {
      label: "View",
      icon: (
        <Iconify
          icon="lucide:view"
          width={22}
          height={22}
          className="text-gray"
        />
      ),
      onClick: (row: User) => handleDetails(row),
    },
    {
      label: "Edit",
      icon: (
        <Iconify
          icon="lucide:edit"
          width={22}
          height={22}
          className="text-primary"
        />
      ),
      onClick: (row: User) => handleEdit(row),
    },
    {
      label: "Delete",
      icon: (
        <Iconify
          icon="ant-design:delete-twotone"
          width={22}
          height={22}
          className="text-red-600"
        />
      ),
      onClick: (row: User) => handleDelete(row),
    },
  ];

  const fetchCustomersList = () => {
    const query = `?search=${searchValue}&page=${currentPage}&limit=${pageLimit}`;
    setIsFetching(true);
    getCustomersList(query)
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
    fetchCustomersList();
  }, [searchValue, currentPage]);

  const handleEdit = (row: User) => {
    router.push(`customers/edit/${row?.id}`);
  };

  const handleDelete = (row: User) => {
    deleteCustomer(row?.id)
      .then((res: any) => {
        toast.success(res?.message);
        fetchCustomersList();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleDetails = (row: User) => {
   router.push(`customers/${row?.id}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
    setCurrentPage(page);
  };

  const handleSelectRows = (rows: User[]) => {
    setSelectedRows(rows);
  };

  const handleSort = (column: keyof User, direction: "asc" | "desc") => {
    console.log(`Sort by ${column} in ${direction} order`);
  };
  const handleFilter = (column: keyof User, filterValue: string) => {
    console.log(`Filter by ${column} with value ${filterValue}`);
  };
  const handleExport = async () => {
  try {
    const response = await exportReportPurchaseOrder();
    // Create a downloadable file
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Purchase_Order_Report.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Export failed", error);
  }
};

  const tabValue: string | any[] = [
    // {
    //   label: "Account",
    //   value: "account",
    //   onClick: (row: User) => {
    //     console.log("Edit:", row);
    //   },
    // },
    // {
    //   label: "Password",
    //   value: "password",
    //   onClick: (row: User) => {
    //     console.log("Delete:", row);
    //   },
    // },
  ];

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
        <Button variant="outline" className="gap-1" onClick={handleExport}>
          <Iconify icon="ph:export" width={18} height={18} /> Export
        </Button>
        <SelectColumn columns={columns} setColumns={setColumns} />
      </div>
    </div>
  );

  return (
    <MainCard
      title="Customers"
      description="View Customer List"
      action={
        <Button onClick={() => router.push(`customers/add`)}>
          Add Customer
        </Button>
      }
      options={
        <div className="flex gap-3 pb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          quo earum nulla autem architecto provident, tenetur eius tempora nobis
          eveniet corporis! Id sapiente nihil explicabo omnis, harum eaque qui
          magnam?
        </div>
      }
    >
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
Customers.routePermission = ["Admin", "Customers"];
export default Customers;
