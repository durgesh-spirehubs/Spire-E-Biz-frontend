import { useEffect, useState } from "react";
import axiosServices from "@/lib/axios";
// import { put, post, patch, get } from 'src/@core/utils/axiosRequests'
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { globalAction } from "@/store";
// import { useRouter } from "next/router";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// ==============================|| CONFIG - LOCAL STORAGE ||============================== //

export default function useHandleForm(
  url,
  pageBehaviour = "Add",
  formikInitialValues,
  validationSchema,
  changeFormSubmitValue = null,
  handleResponse = null,
  handleSuccessResponce = null,
  redirectURL = null
) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { currentPage, recordPerPage, searchStr, currentData } = useSelector(
    (state) => state.listing
  );

  const formik = useFormik({
    initialValues: formikInitialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (changeFormSubmitValue !== null)
        values = changeFormSubmitValue(values);
      if (pageBehaviour === "Add") {
        addData(values, resetForm);
      } else {
        updateData(values);
      }
    },
  });

  const getCurrentDataByID = () => {
    setIsLoading(true); // Loading Start
    axiosServices
      .get(url)
      .then((response) => {
        console.log(response, "response");
        dispatch(
          globalAction("SET_CURRENT_DATA", {
            currentData: response.data,
          })
        );
        setIsLoading(false); // Loading End
      })
      .catch(() => {
        setIsLoading(false); // Loading End
      });
  };

  useEffect(() => {
    if (currentData && pageBehaviour !== "Add") {
      Object.keys(formikInitialValues).forEach((key) => {
        formik?.setFieldValue(key, currentData[key]);
      });
    } else if (!currentData && pageBehaviour !== "Add") {
      getCurrentDataByID();
    }
  }, [currentData]);

  function addData(value, resetForm) {
    setIsLoading(true); // Loading Start
    axiosServices
      .post(url, value)
      .then((res) => {
        console.log(res, "res1");
        if (res?.data?.type === "validationError") {
          console.log(res, "res");
          toast.error(res.data.message);
          res?.data?.errors.forEach((error) => {
            formik.setFieldError(error?.path, error?.msg);
          });
        } else {
          toast.success(res.data?.message);
          resetForm();
          if (redirectURL) {
            router.push(redirectURL);
          } else if (redirectURL === null) {
            router.back();
          }
        }
        if (handleSuccessResponce && res?.status === "success")
          handleSuccessResponce(res);
        return res;
      })
      .catch((err) => {
        if (err?.type === "validationError") {
          err.errors.forEach((error) => {
            formik.setFieldError(error?.path, error?.msg);
          });
        } else {
          toast.error(err?.message);
        }
        return err;
      })
      .finally((result) => {
        setIsLoading(false); // Loading End
        if (handleResponse) handleResponse(result);
      });
  }

  function updateData(value) {
    setIsLoading(false); // Loading Start
    axiosServices
      .put(`${url}`, value)
      .then((res) => {
        if (res?.type === "validationError") {
          toast.error(res.message);
          res.errors.forEach((error) => {
            formik.setFieldError(error.path, error.msg);
          });
        }
        if (handleSuccessResponce && res?.status === "success") {
          handleSuccessResponce();
        }
        return res, toast.success(res.data.message);
      })
      .catch((err) => {
        if (err?.type === "validationError") {
          err.errors.forEach((error) => {
            console.log(error);
            formik.setFieldError(error.path, error.msg);
          });
        } else {
          toast.error(err.message);
        }
        return err;
      })
      .finally((result) => {
        setIsLoading(false); // Loading End
        if (handleResponse) handleResponse(result);
      });
  }

  return [
    formik,
    isLoading,
    currentData,
    currentPage,
    searchStr,
    recordPerPage,
  ];
}
