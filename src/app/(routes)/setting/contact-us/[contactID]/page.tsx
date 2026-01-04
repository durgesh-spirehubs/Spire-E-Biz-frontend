"use client";
import { getContactUsById } from "@/api/contactUs";
import MainCard from "@/components/dashboard/main-card";
import { Card } from "@/components/ui/card";
import Divider from "@/components/ui/divider";
import { useEffect, useState } from "react";

interface Details {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function Page({ params }: { params: { contactID: string } }) {
  // params.contactID;
  const [details, setDetails] = useState<Details>();

  useEffect(() => {
    if (params.contactID) {
      getContactUsById(params.contactID)
        .then((res: any) => setDetails(res?.data))
        .catch((err) => console.log(err, "error"));
    }
  }, [params]);
  return (
    <Card className="bg-white px-4 py-2">
      <MainCard
        title="Contact Us Details"
        //   description="View Contact Us List"
      >
        <Divider />
        <div className="grid grid-cols-3 items-center justify-between gap-5 py-2">
          <div className="flex items-center gap-2">
            <p className="font-medium ">Name:</p>
            <p className="">{details?.fullName}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-medium ">Email:</p>
            <p className="">{details?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-medium ">Contact Number:</p>
            <p className="">{details?.phone}</p>
          </div>
          <div className="col-span-3">
            <p className="font-medium ">Message:</p>
            <p className="">{details?.message}</p>
          </div>
        </div>
      </MainCard>
    </Card>
  );
}
