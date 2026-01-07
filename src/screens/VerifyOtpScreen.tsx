import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthParamList } from '@/navigation/AuthNavigator';
import { InputField } from '@/components/auth/InputField';
import { SignInButton } from '@/components/auth/SignInButton';
import { verifyOtp } from '@/api/auth';
import { LogoIcon } from "@/components/auth/LogoIcon";

type Nav = NativeStackNavigationProp<AuthParamList>;
type VerifyOtpRouteProp = RouteProp<AuthParamList, 'VerifyOtp'>;

export default function VerifyOtpScreen() {
    const navigation = useNavigation<Nav>();
    const route = useRoute<VerifyOtpRouteProp>();
    const { email } = route.params;
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const response = await verifyOtp(email, data.otp);
            // Assuming response contains the token directly or in a property. 
            // The user said: backend returns a token. 
            // Let's assume response (which is response.data) IS the token or contains it.
            // Based on AuthController: return Ok(result.Value); where result.Value is the token string (VerifyOtpResult possibly).
            // Let's check VerifyOtpResult... wait, I didn't see VerifyOtpResult definition.
            // But usually it returns an object. Let's assume it returns { token: "..." } or just the token string.
            // The prompt said: "Example response: { "resetToken": "..." }"
            const resetToken = response?.resetToken || response;

            navigation.navigate("ResetPassword", { email, resetToken });
        } catch (error: any) {
            console.log("Error verifying OTP:", error);
            Alert.alert("Error", error.response?.data?.message || "Invalid OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            <View className="flex-1 px-4 pt-8">
                <View className="mb-8 items-center">
                    <LogoIcon />
                </View>

                <View className="mb-6 items-center">
                    <Text className="text-3xl font-bold text-gray-900">Verify OTP</Text>
                    <Text className="mt-2 text-center text-base text-gray-600">Enter the code sent to {email}</Text>
                </View>

                <View className="mb-6 rounded-3xl bg-white p-4 shadow-md">
                    <View className="px-4 py-4">
                        <View className="mb-5">
                            <InputField
                                name="otp"
                                control={control}
                                placeholder="Enter 6-digit OTP"
                                label="OTP Code"
                                keyboardType="numeric"
                                rules={{
                                    required: "OTP is required",
                                    minLength: { value: 6, message: "OTP must be 6 digits" },
                                    maxLength: { value: 6, message: "OTP must be 6 digits" }
                                }}
                                error={errors.otp?.message as string | undefined}
                            />
                        </View>

                        <SignInButton
                            title="Verify"
                            isLoading={isLoading}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
