"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
// import axiosServices from "@/lib/axios";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import * as Yup from 'yup';
const ForgotPassword = () => {
  const router = useRouter();
  const [step,setStep]=useState(1);
  const [otp,setOtp]=useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [isLoading, setIsLoading] = useState(false);
  const API_URL=process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log(API_URL);
const handleSendOtp=async()=>{
    
        setIsLoading(true);
    try{
        await axios.post(`${API_URL}/api/users/send-otp`,{email})
          toast.success("OTP sent to your email")
          setStep(2);
    }catch(error:any){
        toast.error(error.response?.data?.message)
    }
    finally{
        setIsLoading(false)
    }
}
const handleResetPassword=async()=>{
    if(!otp) return toast.error("OTP is required");
    setIsLoading(true);
    try{
       await axios.post(`${API_URL}/api/users/forget-password`,{
            email,
            otp,
            newPassword
        })
         toast.success("Your Password is change")
         setOtp("")
        setPassword("")
        setConfirmPassword("")

    }catch(error){
        console.log(error)
    }
    finally{
        setIsLoading(false)
    }   
}
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold leading-snug text-center mb-4">Forgot Password</h2>
      {
        step===1 && (
            <>
            <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
          <Button className="w-full mt-4" onClick={handleSendOtp}>
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </Button>
            </>
        )
      }
      {
        step ===2 && (
            <>
            <Input 
            type="text"
            placeholder="Enter Otp"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            />
           <Input
            type="password"
            placeholder="New Password"
            className="mt-3"
            value={newPassword}
            onChange={(e)=>setPassword(e.target.value)}
           />
             <Input
             type="password"
             placeholder="Confirm Password"
             className="mt-3"
             value={confirmPassword}
             onChange={(e)=>setConfirmPassword(e.target.value)}
             />
             <Button className="w-full mt-4" onClick={handleResetPassword}>
                        {isLoading ? "Resetting....":"Reset Password"}
             </Button>
            </>
        )
      }
    </div>
  );
};
// Login.userRole = ["Admin"]
export default ForgotPassword;
