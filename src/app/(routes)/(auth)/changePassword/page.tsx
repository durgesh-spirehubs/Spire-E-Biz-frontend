"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import axiosServices from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { changePasswordSchema} from "@/validationSchema/validationSchema";
const ChangePassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
const formikChangePassword=useFormik({
    initialValues:{
      oldPassword:"",
      newPassword:""
    },
    validationSchema:changePasswordSchema,
   onSubmit:async (values, { resetForm })=>{
   setIsLoading(true);
    try{
 await axiosServices.post(`/api/users/change-password`,{
            oldPassword:values.oldPassword,
            newPassword:values.newPassword
        })
        toast.success("Your Password is change")
         resetForm();
    }catch(error:any){
 toast.error(error.response?.data?.message)
    }
    finally{
      setIsLoading(false)
    }
    }
})
  return (
      <div className="max-w-md w-full mx-auto bg-white dark:bg-slate-950 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold leading-snug text-center mb-4">Change Password</h2>
            <form onSubmit={formikChangePassword.handleSubmit}>
            <Input 
            type="text"
            name="oldPassword"
            placeholder="Enter Old Password"
            value={formikChangePassword.values.oldPassword}
            onChange={formikChangePassword.handleChange}
            onBlur={formikChangePassword.handleBlur}
            className={formikChangePassword.touched.oldPassword && formikChangePassword.errors.oldPassword ?"border-red-500 focus-visible:ring-red-500 mt-3":"mt-3 w-full"}
            />
          {formikChangePassword.touched.oldPassword && formikChangePassword.errors.oldPassword && (
            <div className="text-red-500 text-sm mt-2">{formikChangePassword.errors.oldPassword}</div>
          )}
           <Input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className={formikChangePassword.touched.newPassword && formikChangePassword.errors.newPassword ?"border-red-500 focus-visible:ring-red-500 mt-3":"mt-3 w-full"}
            value={formikChangePassword.values.newPassword}
            onChange={formikChangePassword.handleChange}
            onBlur={formikChangePassword.handleBlur}
           />
          {formikChangePassword.touched.newPassword && formikChangePassword.errors.newPassword && (
          <div className="text-red-500 text-sm mt-2">{formikChangePassword.errors.newPassword}</div>
          )}
              <Button className="w-full mt-4" type="submit"   disabled={isLoading}>
                                  {isLoading ? "Resetting....":"Reset Password"}
                       </Button>
            </form>
            </div>
  );
};
//Login.userRole = ["Admin"]
export default ChangePassword;
