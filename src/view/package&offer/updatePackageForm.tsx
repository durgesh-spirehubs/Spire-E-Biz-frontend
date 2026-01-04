"use client";
import React, { useEffect, useState } from "react";
import MainCard from "@/components/dashboard/main-card";

// ** Third Party Imports
import * as yup from "yup";

// ** Actions Imports
// import useHandleForm from "src/hooks/useHandleForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useHandleForm from "../../hooks/useHandleForm";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosServices from "@/lib/axios";

interface MainCardProp {
  pageBehaviour?: string;
}

interface FormValues {
  pageBehaviour: string;
  package_name: string;
  user_limit: number;
  discount_type: string;
  price_month: number;
}

const validationSchema = yup.lazy((values: FormValues) => {
  let baseSchema = {
    package_name: yup.string().required("First Name is required."),
    user_limit: yup.number().required("Email Address is required."),
    discount_type: yup.string().required("Business Type is required."),
    price_month: yup.number().required("Price is required."),
  };
  return yup.object().shape(baseSchema);
});

function UpdatePackageForm({ pageBehaviour }: MainCardProp) {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname?.split("/");
  const packageId = pathSegments
    ? pathSegments[pathSegments.length - 1]
    : null;

  const [businessList, setBusinessList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formikInitialValues = {
    pageBehaviour: pageBehaviour,
    package_name: "",
    user_limit: "",
    discount_type: "",
    price_month: "",
  };

  useEffect(() => {
    axiosServices.get("/api/business-type").then((res) => {
      console.log(res, "resss");
      if (res?.data?.status === "success") {
        setBusinessList(res?.data?.data?.rows);
      }
    });
  }, []);

  const url = React.useMemo(
    () => (pageBehaviour === "Add" ? "/api/packages" : `/api/packages/${packageId}`),
    [pageBehaviour]
  );
  const [formik, isLoading, currentData] = useHandleForm(
    url,
    pageBehaviour,
    formikInitialValues,
    validationSchema
  );

  // Calculate discounted and amount

  useEffect(() => {
    if (formik.values.discount_type === "flat") {
      formik.setFieldValue(
        "total_price",
        formik.values.price_month - formik.values.discount_price
      );
    } else {
      const pricePercentage =
        (formik.values.price_month / 100) * formik.values.discount_price;
      formik.setFieldValue(
        "total_price",
        formik.values.price_month - pricePercentage
      );
    }
  }, [formik.values.discount_price]);

  return (
    <MainCard
      title={`${pageBehaviour} Package`}
      description="View Package List"
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-background rounded p-4 my-4 py-4">
          <div className=" grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label
                className="text-black text-sm font-normal"
                htmlFor="package_name"
              >
                Package Name*
              </Label>
              <Input
                type="text"
                name="package_name"
                id="package_name"
                onChange={formik.handleChange}
                value={formik.values.package_name}
                className="focus:outline-none text-[#363D4A] text-sm bg-blue-50"
                placeholder="Enter business name here"
              />
              {formik.errors.package_name && formik.touched.package_name && (
                <small className="text-red-500">
                  {formik.errors.package_name}
                </small>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                className="text-black text-sm font-normal"
                htmlFor="user_limit"
              >
                User Limit *
              </Label>
              <Input
                type="number"
                name="user_limit"
                id="user_limit"
                onChange={formik.handleChange}
                value={formik.values.user_limit}
                className="focus:outline-none text-[#363D4A] text-sm bg-blue-50"
                placeholder="Enter contact person name here"
              />
              {formik.errors.user_limit && formik.touched.user_limit && (
                <small className="text-red-500">
                  {formik.errors.user_limit}
                </small>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                className="text-black text-sm font-normal"
                htmlFor="business_type"
              >
                Price/month*
              </Label>
              <Input
                type="number"
                name="price_month"
                id="price_month"
                onChange={formik.handleChange}
                value={formik.values.price_month}
                className="focus:outline-none text-[#363D4A] text-sm bg-blue-50"
                placeholder="Enter Price/month here"
              />
              {formik.errors.price_month && formik.touched.price_month && (
                <small className="text-red-500">
                  {formik.errors.price_month}
                </small>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                className="text-black text-sm font-normal"
                htmlFor="discount_type"
              >
                Discount Type*
              </Label>
              <Select
                onValueChange={(value) =>
                  formik.setFieldValue("discount_type", value)
                }
                value={formik.values.discount_type}
              >
                <SelectTrigger className="focus:outline-none text-[#363D4A] text-sm bg-blue-50">
                  <SelectValue
                    className="font-normal"
                    placeholder={`Select Discount Type`}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>None</SelectLabel>
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="precentage">Precentage</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {formik.errors.discount_type && formik.touched.discount_type && (
                <small className="text-red-500">
                  {formik.errors.discount_type}
                </small>
              )}
            </div>
            {formik.values.discount_type === "flat" && (
              <div className="flex flex-col gap-1.5">
                <Label
                  className="text-black text-sm font-normal"
                  htmlFor="business_type"
                >
                  Discount Price (INR)*
                </Label>
                <Input
                  type="number"
                  name="discount_price"
                  id="discount_price"
                  onChange={formik.handleChange}
                  value={formik.values.discount_price}
                  className="focus:outline-none text-[#363D4A] text-sm bg-blue-50"
                  placeholder="Enter Price/month here"
                />
                {formik.errors.discount_price &&
                  formik.touched.discount_price && (
                    <small className="text-red-500">
                      {formik.errors.discount_price}
                    </small>
                  )}
              </div>
            )}
            {formik.values.discount_type === "precentage" && (
              <div className="flex flex-col gap-1.5">
                <Label
                  className="text-black text-sm font-normal"
                  htmlFor="business_type"
                >
                  Discount in (%)*
                </Label>
                <Input
                  type="number"
                  name="discount_price"
                  id="discount_price"
                  onChange={formik.handleChange}
                  value={formik.values.discount_price}
                  className="focus:outline-none text-[#363D4A] text-sm bg-blue-50"
                  placeholder="Enter Price/month here"
                />
                {formik.errors.discount_price &&
                  formik.touched.discount_price && (
                    <small className="text-red-500">
                      {formik.errors.discount_price}
                    </small>
                  )}
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <Label
                className="text-black text-sm font-normal"
                htmlFor="business_type"
              >
                Total Price
              </Label>
              <Input
                type="number"
                name="total_price"
                id="total_price"
                onChange={formik.handleChange}
                value={formik.values.total_price}
                className="focus:outline-none text-[#363D4A] text-sm bg-blue-50"
                placeholder="Enter Total Price here"
              />
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

export default UpdatePackageForm;
