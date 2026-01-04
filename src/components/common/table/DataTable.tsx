import React, { useState } from "react";
import { DataTableProps, Column } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Iconify from "@/components/ui/iconify";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Loader from "@/components/ui/loader";

const DataTable = <T,>({
  columns,
  data,
  actions = [],
  pagination,
  onSort,
  onFilter,
  onSelect,
  isCheckbox,
  isFetching,
}: DataTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showFilter, setShowFilter] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [filters, setFilters] = useState<any>({});

  const handleSort = (column: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortColumn === column && sortDirection === "asc") {
      direction = "desc";
    }
    setSortColumn(column);
    setSortDirection(direction);
    onSort && onSort(column, direction);
  };

  const handleShowFilter = (column: string) => {
    if (showFilter.includes(column)) {
      const filterList = showFilter.filter((value: any) => value !== column);
      setShowFilter(filterList);
    } else {
      setShowFilter((prev: any) => [...prev, column]);
    }
  };

  const handleFilterChange = (column: keyof T, value: string) => {
    setFilters((prev: any) => ({ ...prev, [column]: value }));
    onFilter && onFilter(column, value);
  };

  const handleSelectRows = (id: any) => {
    const isRowSelected = selectedRows.includes(id);

    const updatedRows = isRowSelected
      ? selectedRows.filter((selectedId: any) => selectedId !== id)
      : [...selectedRows, id];

    setSelectedRows(updatedRows);

    if (onSelect) {
      onSelect(updatedRows);
    }
  };

  const handleSelectAllRows = () => {
    if (selectedRows?.length === data?.length) {
      setSelectedRows([]);
      onSelect([]);
    } else {
      const allIds = data.map((item: any) => item.id);
      setSelectedRows(allIds);
      onSelect(allIds);
    }
  };

  const renderHeader = () => {
    return (
      <TableHeader className="bg-blue-100">
        <TableRow>
          {isCheckbox && (
            <TableHead className="w-10">
              <Checkbox
                checked={selectedRows?.length === data?.length}
                className="mt-1 rounded-md"
                onClick={handleSelectAllRows}
              />
            </TableHead>
          )}
          <TableHead className="py-1">
            <div className="flex items-center gap-1">
              <span className="text-slate-900 w-10 text-center">S. No.</span>
            </div>
          </TableHead>
          {columns.map(
            (column: any) =>
              (column?.isVisible === undefined || column?.isVisible) && (
                <TableHead key={String(column.accessor)} className="py-1">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-900">{column.header}</span>
                    {column.sortable && (
                      <button onClick={() => handleSort(column.accessor)}>
                        {sortColumn === column.accessor ? (
                          sortDirection === "asc" ? (
                            <Iconify
                              icon="tabler:arrow-narrow-up"
                              width={17}
                              height={17}
                              color="#333333"
                            />
                          ) : (
                            <Iconify
                              icon="tabler:arrow-narrow-down"
                              width={17}
                              height={17}
                              color="#333333"
                            />
                          )
                        ) : (
                          <Iconify
                            icon="tabler:arrow-narrow-up"
                            width={17}
                            height={17}
                            color="#333333"
                          />
                        )}
                      </button>
                    )}
                    {column.filterable && (
                      <button onClick={() => handleShowFilter(column.accessor)}>
                        {showFilter.includes(column.accessor) ? (
                          <Iconify
                            icon="material-symbols:filter-list"
                            width={20}
                            height={20}
                            color="#333333"
                          />
                        ) : (
                          <Iconify
                            icon="material-symbols:filter-list-off"
                            width={18}
                            height={18}
                            color="#333333"
                          />
                        )}
                      </button>
                    )}
                  </div>
                  {showFilter.includes(column.accessor) && (
                    <>
                      {column?.filterType === "select" ? (
                        <div className="mt-1 py-1">
                          <Select>
                            <SelectTrigger className="w-[180px] font-normal h-[30px] rounded">
                              <SelectValue
                                className="font-normal"
                                placeholder={`Select ${column.header}`}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {column?.filterOptions &&
                                  column?.filterOptions.map(
                                    (item: any, index: number) => (
                                      <SelectItem
                                        value={item?.value}
                                        key={index}
                                      >
                                        {item?.label}
                                      </SelectItem>
                                    )
                                  )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <input
                          type="text"
                          placeholder={`Filter ${column.header}`}
                          value={filters[column.accessor] || ""}
                          onChange={(e) =>
                            handleFilterChange(column.accessor, e.target.value)
                          }
                          className="mt-1 py-1 px-2 border border-gray-300 rounded text-sm font-normal"
                        />
                      )}
                    </>
                  )}
                </TableHead>
              )
          )}
          {actions.length > 0 && (
            <TableHead className="text-center text-slate-900">
              Actions
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
    );
  };

  const renderBody = () => {
    return (
      <TableBody>
        {!isFetching &&
          data.length > 0 &&
          data.map((row: any, rowIndex: number) => (
            <TableRow key={rowIndex}>
              {isCheckbox && (
                <TableCell className="w-10">
                  <Checkbox
                    className="mt-1 rounded-md"
                    checked={selectedRows?.includes(row?.id)}
                    onClick={() => {
                      handleSelectRows(row?.id);
                    }}
                  />
                </TableCell>
              )}
              <TableCell className="w-10 text-center">
                {rowIndex + 1}.
              </TableCell>
              {columns.map(
                (column) =>
                  (column?.isVisible === undefined || column?.isVisible) && (
                    <TableCell key={String(column.accessor)}>
                      {column.action ? (
                        <span
                          className="cursor-pointer hover:text-primary"
                          onClick={() => column.action && column.action(row)}
                        >
                          {row[column.accessor]}
                        </span>
                      ) : (
                        <>
                          {column.render
                            ? column.render(row[column.accessor], row)
                            : row[column.accessor]}
                        </>
                      )}
                    </TableCell>
                  )
              )}
              {actions.length > 0 && (
                <TableCell className="text-center">
                  <button className="py-2"></button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button size="icon" variant="outline">
                        {" "}
                        <Iconify
                          icon="mi:options-vertical"
                          width={25}
                          height={25}
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full min-w-24 p-1">
                      <div className="grid gap-1">
                        {actions.map((item: any, index: number) => (
                          <button
                            key={index}
                            className="px-2 py-2 rounded-md hover:bg-slate-300 hover:dark:bg-slate-800 hover:dark:text-slate-200"
                            onClick={() => {
                              item?.onClick(row);
                            }}
                          >
                            <div className="flex flex-row items-center gap-2">
                              {item.icon}
                              {item?.label}
                            </div>
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              )}
            </TableRow>
          ))}
        {!isFetching && (!data || data?.length === 0) && (
          <TableRow>
            <TableCell
              colSpan={columns.length + (actions.length > 0 ? 2 : 1)}
              align="center"
              className="w-full"
            >
              Data not found
            </TableCell>
          </TableRow>
        )}
        {isFetching && (
          <TableRow>
            <TableCell
              colSpan={columns.length + (actions.length > 0 ? 2 : 1)}
              align="center"
              className="w-full"
            >
              <div className="flex h-12 w-full justify-center items-center">
                <div className="h-3 w-3 bg-primary rounded-full mr-1 animate-bounce"></div>
                <div className="h-3 w-3 bg-primary rounded-full mr-1 animate-bounce200"></div>
                <div className="h-3 w-3 bg-primary rounded-full animate-bounce400"></div>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };

  const renderPagination = () => {
    if (!pagination) return null;
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page") || "1";
    const { currentPage, pageSize, totalPages, onPageChange } = pagination;

    return (
      <div className="flex justify-center items-center mt-4 mb-3 gap-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
        >
          Previous
        </Button>
        <span className="w-8 text-center">{currentPage}</span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next
        </Button>
        {/* <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => {
                  if (currentPage > 2) {
                    onPageChange(currentPage - 1);
                  }
                }}
              />
            </PaginationItem>
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink href={`?page=${currentPage - 1}`}>
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink isActive href={`?page=${currentPage}`}>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`?page=${currentPage + 1}`}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
            {totalPages - 1 > currentPage && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem
              onClick={() => {
                if (totalPages - 1 > currentPage) {
                  onPageChange(currentPage + 1);
                }
              }}
            >
              <PaginationNext href="#" aria-disabled="true" />
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-950 rounded-lg shadow-custom p-2 ">
      <Table className="sticky border-b">
        {renderHeader()}
        {renderBody()}
      </Table>
      {renderPagination()}
    </div>
  );
};

export default DataTable;
