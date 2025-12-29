"use client";
import { SelectColumn } from "@/components/common/SelectColumn";
import DataTable from "@/components/common/table/DataTable";
import { Column } from "@/components/common/table/types";
import { TabList } from "@/components/common/TabList";
import MainCard from "@/components/dashboard/main-card";
import { TableListing } from "@/components/dashboard/table-listing";
import { Button } from "@/components/ui/button";
import Iconify from "@/components/ui/iconify";
import { deleteCustomer, getCustomersList } from "@/api/customer";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FilterColumn } from "@/components/common/FilterColumn";

interface User {
  id: number;
  name: string;
  packageName: string;
  amount: string;
  paymentStatus: any;
  startedAt: string;
  endingAt: string;
  currentPackage: string;
  role: string;
  status: string;
}

const Subscriptions = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const [data, setData] = useState<User[]>([
    // {
    //   id: 1,
    //   name: "Alice",
    //   businessName: "Alice",
    //   contactPereson: "Alice",
    //   businessType: "Alice",
    //   email: "alice@example.com",
    //   phone: "9876543210",
    //   currentPackage: "9876543210",
    //   role: "Admin",
    //   status: "Active",
    // },
    // {
    //   id: 2,
    //   name: "Bob",
    //   businessName: "Bob",
    //   email: "bob@example.com",
    //   phone: "9876543210",
    //   role: "User",
    // },
    // Add more data as needed
  ]);

  const handleDetails = (row: any) => {
    console.log(row, "dfdfd");
  };

  const getAllCustomersList = () => {
    getCustomersList()
      .then((res: any) => {
        setData(res?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getAllCustomersList();
  }, []);

  const allColumns: Column<User>[] = [
    // { header: "S. No.", accessor: "id", sortable: true, isVisible: true },
    {
      header: "Package Name",
      accessor: "packageName",
      sortable: true,
      filterable: true,
      filterType: "select",
      filterOptions: [
        { value: "option1", label: "option1" },
        { value: "option2", label: "option2" },
      ],
      isVisible: true,
      action: (row) => handleDetails(row),
      // render: (value, row) => <p>{row?.name}</p>,
    },
    {
      header: "Amount",
      accessor: "amount",
      isVisible: true,
    },
    {
      header: "Payment Status",
      accessor: "paymentStatus",
      isVisible: true,
      render: (value, row) => <p>{row?.name}</p>,
    },
    {
      header: "Started  at",
      accessor: "startedAt",
      isVisible: true,
      render: (value, row) => (
        <p>
          {row?.name}
        </p>
      ),
    },
    {
      header: "Ending at",
      accessor: "endingAt",
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
      onClick: (row: User) => {
        router.push(`customers/edit/${row?.id}`);
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
      onClick: (row: User) => {
        deleteCustomer(row?.id)
          .then((res: any) => {
            toast.success(res?.message);
            getAllCustomersList();
          })
          .catch((err) => {
            toast.error(err.message);
          });
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

  const handleSort = (column: keyof User, direction: "asc" | "desc") => {
    // Implement sorting logic here
    console.log(`Sort by ${column} in ${direction} order`);
  };

  const handleFilter = (column: keyof User, filterValue: string) => {
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
      title="Subscription"
      description="View Subscription List"
      action={
        <Button onClick={() => router.push(`Subscriptions/add`)}>
          Add Subscription
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

Subscriptions.routePermission = ["Admin", "Subscriptions"];
export default Subscriptions;
