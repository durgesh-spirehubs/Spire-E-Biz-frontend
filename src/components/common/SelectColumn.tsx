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

export function SelectColumn({ columns, setColumns }: any) {
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
        <Button variant="outline" size="icon" className="gap-1">
          <Iconify
            icon="fluent:column-triple-edit-20-regular"
            width={20}
            height={20}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="w-full min-w-44">
        <DropdownMenuLabel>Select Column</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {columns &&
            columns?.length > 0 &&
            columns.map((item: any, index: number) => (
              <DropdownMenuItem key={index}>
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={item?.isVisible || item?.isVisible === undefined}
                    id={item?.header}
                    onClick={() => {
                      toggleColumnVisibility(item?.header);
                    }}
                  />
                  <Label htmlFor={item?.header}>{item?.header}</Label>
                </div>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
