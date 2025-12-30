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

interface MainCardProp {
  pageBehaviour?: string;
}

interface CurrentDataType {
  businessTypeDetails: any;
  businessName: string;
  first_name: string;
  phone_number: number;
  email_address: string;
}

interface FormValues {
  pageBehaviour: string;
  businessTypeId: number;
  businessName: string;
  first_name: string;
  phone_number: number;
  email_address: string;
  // current_package: string;
  user_password?: string;
  confirm_password?: string;
}

const validationSchema = yup.lazy((values: FormValues) => {
  const baseSchema: Partial<Record<keyof FormValues, yup.AnySchema>> = {
   // businessTypeId: yup.number().required("Business Type is required."),
   // businessName: yup.string().required("First Name is required."),
    first_name: yup.string().required("Contact Person is required."),
    phone_number: yup.string().required("Phone Number is required."),
    email_address: yup.string().required("Email Address is required."),
    // current_package: yup.string().required("Last Name is required."),
  };

  if (values.pageBehaviour === "Add") {
    baseSchema.user_password = yup.string().required("Password is required");
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*\d).{8,}$/,
    //   "Password must contain at least one special character, one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long"
    // );

    baseSchema.confirm_password = yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("user_password")], "Passwords do not match");
  }
  console.log(baseSchema, "baseSchema");
  return yup.object().shape(baseSchema);
});

function UpdateCustomerForm({ pageBehaviour }: MainCardProp) {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname?.split("/");
  const customerId = pathSegments
    ? pathSegments[pathSegments.length - 1]
    : null;

  console.log(customerId, "customerId");
  //   const { customerID } = router.query;
  const [businessList, setBusinessList] = useState([]);
  const [currentData, setCurrentData] = useState<CurrentDataType | undefined>(
    undefined
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  console.log(router, "router");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formikInitialValues = {
    pageBehaviour: pageBehaviour || "",
    businessTypeId: "",
    businessName: "",
    first_name: "",
    last_name: "test",
    phone_number: "",
    email_address: "",
    // current_package: "",
    ...(pageBehaviour === "Add" && {
      user_password: "",
      confirm_password: "",
    }),
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
        ? "/api/customers"
        : `/api/customers/${customerId}`,
    [pageBehaviour]
  );
  const [formik, isLoading] = useHandleForm(
    url,
    pageBehaviour,
    formikInitialValues,
    validationSchema
  );

  useEffect(() => {
    if (pageBehaviour !== "Add" && customerId) {
      axiosServices.get(`/api/customers/${customerId}`).then((res) => {
        console.log(res, "resss");
        if (res?.data?.status === "success") {
          setCurrentData(res?.data?.data);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (currentData) {
      formik.setFieldValue(
        "businessTypeId",
        currentData.businessTypeDetails?.id
      );
      formik.setFieldValue("businessName", currentData.businessName);
      formik.setFieldValue("first_name", currentData.first_name);
      formik.setFieldValue("phone_number", currentData.phone_number);
      formik.setFieldValue("email_address", currentData.email_address);
    }
  }, [currentData]);


  return (
    <MainCard
      title={`${pageBehaviour} Customers`}
      description="View Customer List"
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-background rounded p-4 my-4 py-4">
          <div className=" grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label
                className="text-black text-sm font-normal"
                htmlFor="businessTypeId"
              >
                Business Type*
              </Label>
              <Select
                onValueChange={(value) =>
                  formik.setFieldValue("businessTypeId", value)
                }
                value={formik.values.businessTypeId}
              >
                <SelectTrigger className="focus:outline-none text-[#363D4A] text-sm  bg-blue-50">
                  <SelectValue
                    className="font-normal"
                    placeholder={`Select Business Type*`}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {businessList &&
                      businessList.map((item: any, index: number) => (
                        <SelectItem value={String(item?.id)} key={index}>
                          {item?.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {formik.errors.businessTypeId &&
                formik.touched.businessTypeId && (
                  <small className="text-red-500">
                    {formik.errors.businessTypeId}
                  </small>
                )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                className="text-black text-sm font-normal"
                htmlFor="businessName"
              >
                Business Name*
              </Label>
              <Input
                type="text"
                name="businessName"
                id="businessName"
                onChange={formik.handleChange}
                value={formik.values.businessName}
                className="focus:outline-none text-[#363D4A] text-sm  bg-blue-50"
                placeholder="Enter business name here"
              />
              {formik.errors.businessName && formik.touched.businessName && (
                <small className="text-red-500">
                  {formik.errors.businessName}
                </small>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                className="text-black text-sm font-normal"
                htmlFor="first_name"
              >
                Contact Person*
              </Label>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                onChange={formik.handleChange}
                value={formik.values.first_name}
                className="focus:outline-none text-[#363D4A] text-sm bg-blue-50"
                placeholder="Enter contact person name here"
              />
              {formik.errors.first_name && formik.touched.first_name && (
                <small className="text-red-500">
                  {formik.errors.first_name}
                </small>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                className="text-black text-sm font-normal"
                htmlFor="first_name"
              >
                Phone Number*
              </Label>
              <Input
                type="text"
                name="phone_number"
                id="phone_number"
                onChange={formik.handleChange}
                value={formik.values.phone_number}
                className="focus:outline-none text-[#363D4A] text-sm  bg-blue-50"
                placeholder="Enter phone number here"
              />
              {formik.errors.phone_number && formik.touched.phone_number && (
                <small className="text-red-500">
                  {formik.errors.phone_number}
                </small>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                className="text-black text-sm font-normal"
                htmlFor="businessTypeId"
              >
                Email Id*
              </Label>
              <Input
                type="text"
                name="email_address"
                id="email_address"
                onChange={formik.handleChange}
                value={formik.values.email_address}
                className="focus:outline-none text-[#363D4A] text-sm  bg-blue-50"
                placeholder="Enter email here"
              />
              {formik.errors.email_address && formik.touched.email_address && (
                <small className="text-red-500">
                  {formik.errors.email_address}
                </small>
              )}
            </div>
            {/* <div className="flex flex-col gap-1.5">
              <Label
                className="text-black text-sm font-normal"
                htmlFor="businessTypeId"
              >
                Current Package*
              </Label>
              <Input
                type="text"
                name="current_package"
                id="current_package"
                onChange={formik.handleChange}
                value={formik.values.current_package}
                className="focus:outline-none text-[#363D4A] text-sm  bg-blue-50"
                placeholder="Enter current package here"
              />
              {formik.errors.current_package &&
                formik.touched.current_package && (
                  <small className="text-red-500">
                    {formik.errors.current_package}
                  </small>
                )}
            </div> */}
            {pageBehaviour === "Add" && (
              <>
                <div className="flex flex-col gap-1.5">
                  <Label
                    className="text-black text-sm font-normal"
                    htmlFor="businessTypeId"
                  >
                    Password*
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="user_password"
                      id="user_password"
                      onChange={formik.handleChange}
                      value={formik.values.user_password}
                      className="focus:outline-none text-[#363D4A] text-sm  bg-blue-50 w-full pr-10" // Add padding to the right for the icon
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeIcon className="h-5 w-5 " />
                      ) : (
                        <EyeOffIcon className="h-5 w-5 " />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label
                    className="text-black text-sm font-normal"
                    htmlFor="businessTypeId"
                  >
                    Confirm Password*
                  </Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      id="confirm_password"
                      onChange={formik.handleChange}
                      value={formik.values.confirm_password}
                      className="focus:outline-none text-[#363D4A] text-sm  bg-blue-50 w-full pr-10" // Add padding to the right for the icon
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? (
                        <EyeIcon className="h-5 w-5 " />
                      ) : (
                        <EyeOffIcon className="h-5 w-5 " />
                      )}
                    </button>
                  </div>
                  {formik.errors.confirm_password &&
                    formik.touched.confirm_password && (
                      <small className="text-red-500">
                        {formik.errors.confirm_password}
                      </small>
                    )}
                </div>
              </>
            )}
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

export default UpdateCustomerForm;
