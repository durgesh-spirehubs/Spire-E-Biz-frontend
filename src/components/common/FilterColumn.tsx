import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Iconify from "@/components/ui/iconify";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Column } from "./table/types";

export function FilterColumn({ columns, setColumns }: any) {
  const toggleColumnVisibility = (header: any) => {
    setColumns((prevColumns: Column<any>[]) =>
      prevColumns.map((column) =>
        column.header === header
          ? { ...column, isVisible: !column.isVisible }
          : column
      )
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-1">
          <Iconify icon="basil:filter-outline" width={18} height={18} /> Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="w-full min-w-44">
        <DropdownMenuLabel>Select Filter Column</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {columns &&
            columns?.length > 0 &&
            columns.map((item: any, index: number) => (
              <DropdownMenuItem key={index}>
                <div className="flex items-center space-x-3">
                  {/* <Switch
                    checked={item?.isVisible || item?.isVisible === undefined}
                    id={item?.header}
                    onClick={() => {
                      toggleColumnVisibility(item?.header);
                    }}
                  /> */}
                  <Label htmlFor={item?.header}>{item?.header}</Label>
                </div>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
