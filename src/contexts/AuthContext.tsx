"use client";
import axiosServices from "@/lib/axios";
import accountReducer from "@/store/accountReducer";
import { AUTH_LOADING, LOGIN, LOGOUT, SET_ERROR } from "@/store/actionType";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "sonner";

type AuthContextType = {
  isLoggedIn: any;
  isInitialized: any;
  isAuthLoading: any;
  user: any;
  errors: any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  refreshUser: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isInitialized: false,
  isAuthLoading: true,
  user: null,
  errors: null,
  login: async () => {},
  register: async () => {},
  refreshUser: async () => {},
  logout: () => {},
});

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  isAuthLoading: true,
  user: null,
  errors: null,
  refreshUser: async () => {},
  login: async () => {},
  logout: () => {},
  sendOtp: async () => {},
  loginWithOTP: async () => {},
  verifyOTP: async () => {},
  resetPassword: async () => {},
  updateProfile: () => {},
};

const setSession = (serviceToken: any) => {
  if (serviceToken) {
    localStorage.setItem("serviceToken", serviceToken);
    axiosServices.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem("serviceToken");
    delete axiosServices.defaults.headers.common.Authorization;
  }
};

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  const refreshUser = async () => {
    dispatch({
      type: AUTH_LOADING,
      payload: true,
    });
    try {
      const serviceToken: any = window.localStorage.getItem("serviceToken");
      setSession(serviceToken);
      if (serviceToken) {
        const response = await axiosServices.get("/api/users/me");
        if (response.data?.user) {
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: response.data?.user,
            },
          });
        } else {
          dispatch({
            type: LOGOUT,
          });
        }
      } else {
        dispatch({
          type: LOGOUT,
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: LOGOUT,
      });
    }
  };
  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // dispatch({
      //   type: AUTH_LOADING,
      //   payload: true,
      // });
      const response = await axiosServices.post("/api/users/login", {
        email,
        password,
      });
      if (response.data?.accessToken) {
        toast.success("Login Successfully");
        setSession(response.data?.accessToken);
        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user: response.data?.user,
          },
        });
      }
    } catch (error: any) {
      toast.error(error?.message);
      if (error?.message === "The User is not verified") {
        dispatch({
          type: SET_ERROR,
          payload: {
            errors: error?.message,
          },
        });
      }
    }
  };

  const logout = () => {
    dispatch({
      type: AUTH_LOADING,
      payload: true,
    });
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
