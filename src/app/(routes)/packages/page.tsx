"use client";
import { SelectColumn } from "@/components/common/SelectColumn";
import DataTable from "@/components/common/table/DataTable";
import { Column } from "@/components/common/table/types";
import { TabList } from "@/components/common/TabList";
import MainCard from "@/components/dashboard/main-card";
import { TableListing } from "@/components/dashboard/table-listing";
import { Button } from "@/components/ui/button";
import Iconify from "@/components/ui/iconify";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FilterColumn } from "@/components/common/FilterColumn";
import { getPackagesList } from "@/api/package";

interface Package {
  id: number;
  packageId: string;
  title?: string;
  Price_month: string;
  user_limit: number;
  billing_limits: number;
  customer_limits: number;
  current_subscription: string;
  status: string;
}

const Packages = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const [data, setData] = useState<Package[]>([]);

  const handleDetails = (row: any) => {
    console.log(row, "dfdfd");
  };

  useEffect(() => {
    getPackagesList()
      .then((res: any) => {
        setData(res?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  const allColumns: Column<Package>[] = [
    {
      header: "Package Name",
      accessor: "packageId",
      sortable: false,
      filterable: false,
      isVisible: true,
      render: (value, row) => (
        <p
          className="cursor-pointer"
          onClick={() => {
            handleDetails(row);
          }}
        >
          {row?.packageId}
          <br />
          {row?.title}
        </p>
      ),
    },
    {
      header: "Price/month",
      accessor: "Price_month",
      isVisible: true,
    },
    {
      header: "User Limit",
      accessor: "user_limit",
      isVisible: true,
    },
    {
      header: "No of Billing limits",
      accessor: "billing_limits",
      isVisible: false,
    },
    {
      header: "Customer limits",
      accessor: "customer_limits",
      isVisible: true,
    },
    {
      header: "Current  Subscription",
      accessor: "current_subscription",
      isVisible: true,
    },
    {
      header: "Status",
      accessor: "status",
      isVisible: true,
    },
  ];

  const [columns, setColumns] = useState(allColumns);
  const [currentPage, setCurrentPage] = useState(1);

  const actions = [
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
      onClick: (row: any) => {
        console.log("Edit:", row);
      },
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
      onClick: (row: any) => {
        console.log("Delete:", row);
      },
    },
  ];

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

  const handleSort = (column: string, direction: "asc" | "desc") => {
    // Implement sorting logic here
    console.log(`Sort by ${column} in ${direction} order`);
  };

  const handleFilter = (column: string, filterValue: string) => {
    // Implement filtering logic here
    console.log(`Filter by ${column} with value ${filterValue}`);
  };

  const handlePageChange = (page: number) => {
    // Implement pagination logic here
    setCurrentPage(page);
    console.log("Change to page:", page);
  };

  const handleSelectRows = (rows: any) => {
    setSelectedRows(rows);
  };

  const TableSearchFilter = () => {
    return (
      <div className="flex gap-2 items-center justify-between py-2">
        <div>
          <input
            type="text"
            placeholder="Search here"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="mt-1 py-2 px-2 border border-gray-300 rounded text-sm font-normal w-full min-w-64"
            autoFocus
          />
        </div>
        <div className="flex gap-2">
          {/* <Button variant="outline" className="gap-1">
            <Iconify icon="basil:filter-outline" width={18} height={18} />{" "}
            Filter
          </Button> */}
          <FilterColumn columns={columns} setColumns={setColumns} />
          <Button variant="outline" className="gap-1">
            <Iconify icon="ph:export" width={18} height={18} /> Export
          </Button>
          <SelectColumn columns={columns} setColumns={setColumns} />
          {/* <Button variant="outline" size="icon" className="gap-1">
            <Iconify icon="fluent:column-triple-edit-20-regular" width={20} height={20} />
          </Button> */}
        </div>
      </div>
    );
  };

  return (
    <MainCard
      title="Packages"
      description="View Package List"
      action={
        <Button onClick={() => router.push(`packages/add`)}>Add Package</Button>
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
      {/* <TableListing /> */}
      {selectedRows?.length > 0 ? (
        <div className="flex gap-2 items-center justify-between py-2">
          <div>
            <p className="text-md font-bold text-primary">
              You have selected {selectedRows?.length} row(s)
            </p>
          </div>
          <div>
            <Button
              size="sm"
              variant="outline"
              className="text-red-500 hover:text-red-500 border-red-500 hover:border-red-500"
            >
              Delete
            </Button>
          </div>
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
        pagination={{
          currentPage: currentPage,
          pageSize: 10,
          totalPages: 5,
          onPageChange: handlePageChange,
        }}
      />
    </MainCard>
  );
};

Packages.routePermission = ["Admin", "Packages"];
export default Packages;
