import * as Yup from "yup"
export const emailSchema=Yup.object({
    email:Yup.string().email("Invalid Email").required("Email is required")
})
export const resetPasswordSchema=Yup.object({
    otp:Yup.string().required("OTP is  required"),
    newPassword:Yup.string().min(8,"Password must be at least 6 characterts").required("new Password is required"),
    confirmPassword:Yup.string().oneOf([Yup.ref("newPassword")],"Passwords must match").required("confirm password is required")                                                                                                             
})

export const changePasswordSchema=Yup.object({
        oldPassword:Yup.string().min(8,"Password must be at least 6 characterts").required("old Password is required"),
        newPassword:Yup.string().min(8,"Password must be at least 6 characterts").required("new Password is required"),
})

export const loginSchema=Yup.object({
      email:Yup.string().email("Invalid Email").required("Email is required"),
      password:Yup.string().min(8,"Password must be at least 6 characterts").required("Password is required"),
})