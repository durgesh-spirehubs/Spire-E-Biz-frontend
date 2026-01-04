"use client";
import MainCard from "@/components/dashboard/main-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { toast } from "sonner";
import { loginSchema } from "@/validationSchema/validationSchema";
const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const formikLogin=useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema:loginSchema,
    onSubmit:async(values)=>{
        setIsLoading(true);
        try{
          const response:any=await login(values.email,values.password);
          if(response?.status === "success"){
            toast.success(response?.message)
             router.push("/");
          }
        }catch(error:any){
            toast.error(error?.message || "something went wrong");
          } finally{
            setIsLoading(false)
          }
        }
    }
  )
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold leading-snug text-center">Login</h2>
      <p className="text-center text-gray-500 py-2">
        Enter your email and password
      </p>
      <form onSubmit={formikLogin.handleSubmit}>
        <div className="grid w-full items-center gap-1.5 my-5">
          {/* <Label htmlFor="email">Email</Label> */}
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formikLogin.values.email}
            onChange={formikLogin.handleChange}
            onBlur={formikLogin.handleBlur}
            className={formikLogin.touched.email && formikLogin.errors.email?"border-red-500 focus-visible:ring-red-500":" "}
          />
         {formikLogin.touched.email && formikLogin.errors.email && (
            <p className="text-red-500 text-sm mt-2">{formikLogin.errors.email}</p>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5 my-5">
          {/* <Label htmlFor="password">Password</Label> */}
          <Input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={formikLogin.values.password}
            onChange={formikLogin.handleChange}
            onBlur={formikLogin.handleBlur}
            className={formikLogin.touched.password && formikLogin.errors.password?"border-red-500 focus-visible:ring-red-500":" "}
          />
          {formikLogin.touched.password && formikLogin.errors.password && (
            <p className="text-red-500 text-sm mt-2">{formikLogin.errors.password}</p>
          )}
        </div>
        <Link href="/forgotPassword" className="text-primary text-center">Forgot Password?</Link>
        <Button className="w-full mt-5" type="submit" disabled={isLoading}>
          {isLoading ? "Logging..." : "Login"}
        </Button>
      </form>
    </div>
  );
};
Login.userRole = ["Admin"]
export default Login;
