import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const loginValidationSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

export function useLoginForm() {
  return useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })
}
