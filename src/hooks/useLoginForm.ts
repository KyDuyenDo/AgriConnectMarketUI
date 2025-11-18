import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { use } from "react"

const loginValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

export function useLoginForm() {
  return useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  })
}
