export interface Column<T> {
  header: string;
  accessor: keyof T;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: string;
  filterOptions?:any;
  isVisible?:boolean;
  render?: (value: any, row: T) => JSX.Element;
  action?: (row: T) => void;
}

export interface Action<T> {
  label: string;
  onClick: (row: T) => void;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
  pagination?: Pagination;
  onSort?: (column: keyof T, direction: "asc" | "desc") => void;
  onFilter?: (column: keyof T, filterValue: string) => void;
  onSelect: (selectedRows: any) => void;
   filters?: Record<string, string>; 
  isCheckbox: Boolean;
  isFetching?: Boolean;
}
