"use client";
import React, { useEffect, useState } from "react";
import MainCard from "@/components/dashboard/main-card";

// ** Third Party Imports
import * as yup from "yup";

// ** Actions Imports
// import useHandleForm from "src/hooks/useHandleForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useHandleForm from "../../../hooks/useHandleForm";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosServices from "@/lib/axios";
import { Textarea } from "@/components/ui/textarea";

interface MainCardProp {
  pageBehaviour?: string;
}

interface CurrentDataType {
  name: string;
  description: string;
}

interface FormValues {
  name: string;
  description: string;
}

const validationSchema = yup.lazy((values: FormValues) => {
  const baseSchema: Partial<Record<keyof FormValues, yup.AnySchema>> = {
    name: yup.string().required("Name is required."),
    // current_package: yup.string().required("Last Name is required."),
  };

  return yup.object().shape(baseSchema);
});

function UpdateBussinessTypeForm({ pageBehaviour }: MainCardProp) {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname?.split("/");
  const typeId = pathSegments ? pathSegments[pathSegments.length - 1] : null;

  //   const { customerID } = router.query;
  const [businessList, setBusinessList] = useState([]);
  const [currentData, setCurrentData] = useState<CurrentDataType | undefined>(
    undefined
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formikInitialValues = {
    pageBehaviour: pageBehaviour || "",
    name: "",
    description: "",
  };

  useEffect(() => {
    axiosServices.get("/api/business-type").then((res) => {
      if (res?.data?.status === "success") {
        setBusinessList(res?.data?.data);
      }
    });
  }, []);

  const url = React.useMemo(
    () =>
      pageBehaviour === "Add"
        ? "/api/business-type"
        : `/api/business-type/${typeId}`,
    [pageBehaviour]
  );
  const [formik, isLoading] = useHandleForm(
    url,
    pageBehaviour,
    formikInitialValues,
    validationSchema
  );

  useEffect(() => {
    if (pageBehaviour !== "Add" && typeId) {
      axiosServices.get(`/api/business-type/${typeId}`).then((res) => {
        if (res?.data?.status === "success") {
          setCurrentData(res?.data?.data);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (currentData) {
      formik.setFieldValue("name", currentData.name);
      formik.setFieldValue("description", currentData.description);
    }
  }, [currentData]);
  console.log(currentData, "currentData");

  return (
    <MainCard
      title={`${pageBehaviour} Bussiness Type`}
      // description="View Customer List"
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-background rounded p-4 my-4 py-4">
          <div className=" grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-black text-sm font-normal" htmlFor="name">
                Type*
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="focus:outline-none text-[#363D4A] text-sm  bg-blue-50"
                placeholder="Enter business type here"
              />
              {formik.errors.name && formik.touched.name && (
                <small className="text-red-500">{formik.errors.name}</small>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                className="text-black text-sm font-normal"
                htmlFor="Description"
              >
                Description
              </Label>
              <Textarea
                name="description"
                id="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                className="focus:outline-none text-[#363D4A] text-sm  bg-blue-50"
                placeholder=""
              />
              {formik.errors.description && formik.touched.description && (
                <small className="text-red-500">
                  {formik.errors.description}
                </small>
              )}
            </div>
          </div>
          <div className="my-4 first-line:text-center">
            <Button
              className="py-4 text-white max-w-40 w-full "
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Continue"}
            </Button>
          </div>
        </div>
      </form>
    </MainCard>
  );
}

export default UpdateBussinessTypeForm;
