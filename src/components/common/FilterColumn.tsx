// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Iconify from "@/components/ui/iconify";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { Column } from "./table/types";
// interface FilterColumnProps {
//   columns: Column<any>[],
//   onSelectColumn: (columns: Column<any>[]) => void
// }
// export function FilterColumn({ columns, onSelectColumn }: FilterColumnProps) {
// //   const toggleColumnVisibility = (header: any) => {
// //     onSelectColumn((prevColumns: Column<any>[]) =>
// //       prevColumns.map((column) =>
// //         column.header === header
// //           ? { ...column, isVisible: !column.isVisible }
// //           : column
// //       )
// //     );
// //   };
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" className="gap-1">
//           <Iconify icon="basil:filter-outline" width={18} height={18} /> Filter
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent side="bottom" className="w-full min-w-44">
//         <DropdownMenuLabel>Select Filter Column</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//          <DropdownMenuGroup>
//           {columns?.map((item, index) => (
//             <DropdownMenuItem
//               key={index}
//               onClick={() => onSelectColumn(item.accessor as string)}
//             >
//               <Label>{item.header}</Label>
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

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
import { Label } from "@/components/ui/label";
import { Column } from "./table/types";

interface FilterColumnProps {
  columns: Column<any>[];
  onSelectColumn: (accessor: string) => void;
}

export function FilterColumn({ columns, onSelectColumn }: FilterColumnProps) {
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
          {columns.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => onSelectColumn(item.accessor as string)}
            >
              <Label>{item.header}</Label>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
