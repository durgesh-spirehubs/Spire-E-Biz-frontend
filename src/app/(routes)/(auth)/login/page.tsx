"use client";
import MainCard from "@/components/dashboard/main-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response: any = await login(email, password);
      if (response?.status === "success") {
        toast.success(response?.message);
      }
      router.push("/");
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold leading-snug text-center">Login</h2>
      <p className="text-center text-gray-500 py-2">
        Enter your email and password
      </p>
      <form onSubmit={handleLogin}>
        <div className="grid w-full items-center gap-1.5 my-5">
          {/* <Label htmlFor="email">Email</Label> */}
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="grid w-full items-center gap-1.5 my-5">
          {/* <Label htmlFor="password">Password</Label> */}
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Link href="/forgotPassword" className="text-primary text-center">Forgot Password?</Link>
        <Button className="w-full mt-5">
          {isLoading ? "Logging..." : "Login"}
        </Button>
      </form>
    </div>
  );
};
Login.userRole = ["Admin"]
export default Login;
