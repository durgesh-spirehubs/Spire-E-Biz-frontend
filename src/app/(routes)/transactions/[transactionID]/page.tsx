"use client";
import { getTransactionById } from "@/api/transactions";
import MainCard from "@/components/dashboard/main-card";
import { Card } from "@/components/ui/card";
import Chip from "@/components/ui/chip";
import Divider from "@/components/ui/divider";
import { useEffect, useState } from "react";

interface Details {
  transactionId?: string;
  totalAmount?: string;
  tax?: string;
  paidAmount?: string;
}

export default function Page({
  params,
}: {
  params: { transactionID: string };
}) {
  // params.transactionID;
  const [details, setDetails] = useState<Details>();

  useEffect(() => {
    if (params.transactionID) {
      getTransactionById(params.transactionID)
        .then((res: any) => setDetails(res?.data))
        .catch((err) => console.log(err, "error"));
    }
  }, [params]);
  return (
    <Card className="bg-white px-4 py-2">
      <MainCard
        title="Transaction Details"
        //   description="View Contact Us List"
      >
        <Divider />
        <div className="grid grid-cols-3 items-center justify-between gap-5 py-2">
          <div className="flex  flex-col">
            <p className="font-medium ">Transaction Id:</p>
            <Chip label={details?.transactionId} />
          </div>
          <div className="flex  flex-col">
            <p className="font-medium ">Total Amount:</p>
            <p className="">{details?.totalAmount}</p>
          </div>
          <div className="flex  flex-col">
            <p className="font-medium ">tax:</p>
            <p className="">{details?.tax}</p>
          </div>
          <div className="flex  flex-col">
            <p className="font-medium ">tax:</p>
            <p className="">{details?.tax}</p>
          </div>
          <div className="flex  flex-col">
            <p className="font-medium ">Paid Amount:</p>
            <p className="">{details?.paidAmount}</p>
          </div>
          <div className="col-span-3">
            <Divider />
          </div>
        </div>
      </MainCard>
    </Card>
  );
}
