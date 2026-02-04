"use client"

import { useState } from "react"
import { View, Text, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useForm } from "react-hook-form"
import { LogoIcon } from "@/components/auth/LogoIcon"
import { InputField } from "@/components/auth/InputField"
import { PasswordField } from "@/components/auth/PasswordField"
import { AccountTypeSelector } from "@/components/auth/AccountTypeSelector"
import { TermsCheckbox } from "@/components/auth/TermsCheckbox"
import { SignUpButton } from "@/components/auth/SignUpButton"
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons"
import { useNavigation } from "@react-navigation/native"
import { useRegister } from "@/hooks/auth/useAuth"
import theme from "@/utils/theme"

interface RegistrationFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  fullname: string
  phone: string
}

export default function RegisterScreen() {
  const navigation = useNavigation<any>()
  const { mutate: register, isPending } = useRegister()

  const [accountType, setAccountType] = useState<"farmer" | "customer" | "partner">("customer")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullname: "",
      phone: "",
    },
  })

  const password = watch("password")

  const onSubmit = async (data: RegistrationFormData) => {
    if (data.password !== data.confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }

    if (!termsAccepted) {
      Alert.alert("Error", "Please accept the Terms of Service and Privacy Policy")
      return
    }

    const formData = new FormData()
    formData.append("Username", data.username)
    formData.append("Email", data.email)
    formData.append("Password", data.password)
    formData.append("Fullname", data.fullname)
    formData.append("Phone", data.phone)
    formData.append("IsFarmer", (accountType === "farmer").toString())

    register(formData, {
      onSuccess: () => {
        Alert.alert(
          "Verify Your Email",
          `A verification code has been sent to ${data.email}. Please check your email and enter the verification code to complete your registration.`,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
            },
          ],
        )
      },
      onError: (error: any) => {
        console.error(error)
        Alert.alert("Registration Failed", error.response?.data?.message || "An error occurred")
      },
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral.background }}>
      <ScrollView contentContainerClassName="flex-grow" className="flex-1">
        <View
          style={{
            flex: 1,
            paddingHorizontal: theme.spacing.lg,
            paddingBottom: theme.spacing.xxxl,
            paddingTop: theme.spacing.xl,
          }}
        >
          {/* Header */}
          <View style={{ marginBottom: theme.spacing.lg, alignItems: "center", gap: theme.spacing.sm }}>
            <LogoIcon />
            <View style={{ alignItems: "center", gap: theme.spacing.sm }}>
              <Text
                style={{
                  fontSize: theme.fontSize["3xl"],
                  fontWeight: theme.fontWeight.bold,
                  color: theme.colors.neutral.text.primary,
                }}
              >
                Join Our Community
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: theme.fontSize.sm, color: theme.colors.neutral.text.secondary }}
              >
                Create account to discover fresh produce
              </Text>
            </View>
          </View>

          <View
            style={{
              marginBottom: theme.spacing.lg,
              borderRadius: theme.radius.lg,
              borderWidth: 1,
              borderColor: theme.colors.neutral.borderLight,
              backgroundColor: theme.colors.neutral.surface,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.lg,
              ...theme.shadows.sm,
            }}
          >
            <View
              style={{ paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md, gap: theme.spacing.lg }}
            >
              {/* Username */}
              <InputField
                name="username"
                control={control}
                placeholder="johndoe"
                label="Username"
                error={errors.username?.message}
                rules={{ required: "Username is required" }}
              />

              {/* Fullname */}
              <InputField
                name="fullname"
                control={control}
                placeholder="John Doe"
                label="Full Name"
                error={errors.fullname?.message}
                rules={{ required: "Full name is required" }}
              />

              {/* Email */}
              <InputField
                name="email"
                control={control}
                placeholder="your@email.com"
                label="Email Address"
                keyboardType="email-address"
                error={errors.email?.message}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
              />

              {/* Phone */}
              <InputField
                name="phone"
                control={control}
                placeholder="+1234567890"
                label="Phone Number"
                keyboardType="phone-pad"
                error={errors.phone?.message}
                rules={{ required: "Phone number is required" }}
              />

              {/* Password */}
              <PasswordField
                name="password"
                control={control}
                placeholder="Create a strong password"
                label="Password"
                error={errors.password?.message}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
              />

              {/* Confirm Password */}
              <PasswordField
                name="confirmPassword"
                control={control}
                placeholder="Confirm your password"
                label="Confirm Password"
                error={errors.confirmPassword?.message}
                rules={{ required: "Please confirm your password" }}
              />

              {/* Account Type */}
              <AccountTypeSelector accountType={accountType} onSelect={setAccountType} />

              {/* Terms */}
              <TermsCheckbox checked={termsAccepted} onToggle={setTermsAccepted} />

              {/* Submit Button */}
              <SignUpButton isLoading={isPending} onPress={handleSubmit(onSubmit)} />
            </View>
          </View>

          {/* Social Login */}
          <View style={{ marginVertical: theme.spacing.md, flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: theme.colors.neutral.border }} />
            <Text
              style={{
                paddingHorizontal: theme.spacing.md,
                fontSize: theme.fontSize.sm,
                color: theme.colors.neutral.text.secondary,
              }}
            >
              Or sign up with
            </Text>
            <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: theme.colors.neutral.border }} />
          </View>

          <SocialLoginButtons />

          <View style={{ alignItems: "center", gap: theme.spacing.xs, paddingTop: theme.spacing.lg }}>
            <Text style={{ fontSize: theme.fontSize.sm, color: theme.colors.neutral.text.secondary }}>
              Already have an account?
            </Text>
            <Text
              style={{
                fontSize: theme.fontSize.sm,
                fontWeight: theme.fontWeight.semibold,
                color: theme.colors.primary.main,
              }}
            >
              Sign in here
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
