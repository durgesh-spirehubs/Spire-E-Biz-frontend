"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useFormik } from "formik";
import axiosServices from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { emailSchema, resetPasswordSchema } from "@/validationSchema/validationSchema";
const ForgotPassword = () => {
  const router = useRouter();
  const [step,setStep]=useState(1);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
const formikEmail=useFormik({
     initialValues:{
      email:"",
     },
    validationSchema:emailSchema,
    onSubmit:async (values)=>{
      //handleSendOtp(values.email)
      setIsLoading(true);
      try{
      await axiosServices.post(`/api/users/send-otp`, {
        email: values.email,
      });
      toast.success("OTP sent to your email");
      setEmail(values.email); 
      setStep(2);
      }catch(error:any){
        toast.error(error.response?.data?.message)
      }finally{
        setIsLoading(false)
      }
    }
})
const formikResetPassword=useFormik({
    initialValues:{
      otp:"",
      newPassword:"",
      confirmPassword:""
    },
    validationSchema:resetPasswordSchema,
   onSubmit:async (values, { resetForm })=>{
   setIsLoading(true);
    try{
 await axiosServices.post(`/api/users/forget-password`,{
            email,
            otp:values.otp,
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
    <div className="w-full">
      <h2 className="text-xl font-bold leading-snug text-center mb-4">Forgot Password</h2>
      {
        step===1 && (
            <form onSubmit={formikEmail.handleSubmit}>
            <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formikEmail.values.email}
            onChange={formikEmail.handleChange}
            onBlur={formikEmail.handleBlur}
            className={formikEmail.touched.email && formikEmail.errors.email ?"border-red-500 focus-visible:ring-red-500":""}
            />
          {formikEmail.touched.email && formikEmail.errors.email && (
            <div className="text-red-500 text-sm mt-2">{formikEmail.errors.email}</div>
          )}
          <Button className="w-full mt-4" type="submit" disabled={isLoading}>
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </Button>
            </form>
        )
      }
      {
        step ===2 && (
            <form onSubmit={formikResetPassword.handleSubmit}>
            <Input 
            type="text"
            name="otp"
            placeholder="Enter Otp"
            value={formikResetPassword.values.otp}
            onChange={formikResetPassword.handleChange}
            onBlur={formikResetPassword.handleBlur}
            className={formikResetPassword.touched.otp && formikResetPassword.errors.otp ?"border-red-500 focus-visible:ring-red-500 mt-3":"mt-3"}
            />
          {formikResetPassword.touched.otp && formikResetPassword.errors.otp && (
            <div className="text-red-500 text-sm mt-2">{formikResetPassword.errors.otp}</div>
          )}
           <Input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className={formikResetPassword.touched.otp && formikResetPassword.errors.otp ?"border-red-500 focus-visible:ring-red-500 mt-3":"mt-3"}
            value={formikResetPassword.values.newPassword}
            onChange={formikResetPassword.handleChange}
            onBlur={formikResetPassword.handleBlur}
           />
          {formikResetPassword.touched.newPassword && formikResetPassword.errors.newPassword && (
            <div className="text-red-500 text-sm mt-2">{formikResetPassword.errors.newPassword}</div>
          )}
             <Input
             type="password"
             name="confirmPassword"
             placeholder="Confirm Password"
             className={formikResetPassword.touched.otp && formikResetPassword.errors.otp ?"border-red-500 focus-visible:ring-red-500 mt-3":"mt-3"}
             value={formikResetPassword.values.confirmPassword}
             onChange={formikResetPassword.handleChange}
             onBlur={formikResetPassword.handleBlur}
             />
            {formikResetPassword.touched.confirmPassword && formikResetPassword.errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-2">{formikResetPassword.errors.confirmPassword}</div>
          )}
             <Button className="w-full mt-4" type="submit"   disabled={isLoading}>
                        {isLoading ? "Resetting....":"Reset Password"}
             </Button>
            </form>
        )
      }
    </div>
  );
};
// Login.userRole = ["Admin"]
export default ForgotPassword;
