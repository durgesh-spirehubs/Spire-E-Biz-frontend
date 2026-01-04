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
import axiosServices from "@/lib/axios";
import { Textarea } from "@/components/ui/textarea";

interface MainCardProp {
  pageBehaviour?: string;
}

interface CurrentDataType {
  question: string;
  answer: string;
}

interface FormValues {
  question: string;
  answer: string;
}

const validationSchema = yup.lazy((values: FormValues) => {
  const baseSchema: Partial<Record<keyof FormValues, yup.AnySchema>> = {
    question: yup.string().required("Question is required."),
    answer: yup.string().required("Answer is required."),
    // current_package: yup.string().required("Last Name is required."),
  };

  return yup.object().shape(baseSchema);
});

function UpdateFaqForm({ pageBehaviour }: MainCardProp) {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname?.split("/");
  const typeId = pathSegments ? pathSegments[pathSegments.length - 1] : null;

  //   const { customerID } = router.query;
  const [businessList, setFaqsList] = useState([]);
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
    question: "",
    answer: "",
  };

  useEffect(() => {
    axiosServices.get("/api/faqs").then((res) => {
      if (res?.data?.status === "success") {
        setFaqsList(res?.data?.data);
      }
    });
  }, []);

  const url = React.useMemo(
    () => (pageBehaviour === "Add" ? "/api/faqs" : `/api/faqs/${typeId}`),
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
      axiosServices.get(`/api/faqs/${typeId}`).then((res) => {
        if (res?.data?.status === "Success") {
          setCurrentData(res?.data?.data);
        }
      });
    }
  }, []);
  console.log(currentData, "currentData");
  useEffect(() => {
    if (currentData) {
      formik.setFieldValue("question", currentData.question);
      formik.setFieldValue("answer", currentData.answer);
    }
  }, [currentData]);

  return (
    <MainCard
      title={`${pageBehaviour} Faq`}
      // answer="View Customer List"
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-background rounded p-4 my-4 py-4">
          <div className=" grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-black text-sm font-normal" htmlFor="name">
                Question*
              </Label>
              <Input
                type="text"
                name="question"
                id="question"
                onChange={formik.handleChange}
                value={formik.values.question}
                className="focus:outline-none text-[#363D4A] text-sm  bg-blue-50"
                placeholder="Enter question here"
              />
              {formik.errors.question && formik.touched.question && (
                <small className="text-red-500">{formik.errors.question}</small>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                className="text-black text-sm font-normal"
                htmlFor="Description"
              >
                Answer*
              </Label>
              <Textarea
                name="answer"
                id="answer"
                onChange={formik.handleChange}
                value={formik.values.answer}
                className="focus:outline-none text-[#363D4A] text-sm  bg-blue-50"
                placeholder=""
              />
              {formik.errors.answer && formik.touched.answer && (
                <small className="text-red-500">{formik.errors.answer}</small>
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

export default UpdateFaqForm;
