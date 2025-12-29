import { Column } from "./table/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabList({ tabValue }: any) {
  return (
    <Tabs defaultValue={tabValue[0]?.value} className="w-[300px]">
      <TabsList className="grid w-full grid-cols-2 rounded gap-2">
        {tabValue?.length > 0 &&
          tabValue.map((data: any, index: number) => (
            <TabsTrigger value={data?.value} key={index}>
              {data?.label}
            </TabsTrigger>
          ))}
        {/* <TabsTrigger value="password">Password</TabsTrigger> */}
      </TabsList>
    </Tabs>
  );
}
