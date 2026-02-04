import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthParamList } from '@/navigation/AuthNavigator';
import { InputField } from '@/components/auth/InputField';
import { SignInButton } from '@/components/auth/SignInButton'; // Reusing generic button
import { forgotPassword } from '@/api/auth';
import { LogoIcon } from "@/components/auth/LogoIcon";

type Nav = NativeStackNavigationProp<AuthParamList>;

export default function ForgotPasswordScreen() {
    const navigation = useNavigation<Nav>();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await forgotPassword(data.email);
            Alert.alert("Success", "OTP has been sent to your email.", [
                { text: "OK", onPress: () => navigation.navigate("VerifyOtp", { email: data.email }) }
            ]);
        } catch (error: any) {
            console.log("Error sending OTP:", error);
            Alert.alert("Error", error.response?.data?.message || "Failed to send OTP. Please try again.");
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
                    <Text className="text-3xl font-bold text-gray-900">Forgot Password</Text>
                    <Text className="mt-2 text-center text-base text-gray-600">Enter your email to receive an OTP</Text>
                </View>

                <View className="mb-6 rounded-3xl bg-white p-4 shadow-md">
                    <View className="px-4 py-4">
                        <View className="mb-5">
                            <InputField
                                name="email"
                                control={control}
                                placeholder="Enter your email"
                                label="Email"
                                keyboardType="email-address"
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                }}
                                error={errors.email?.message as string | undefined}
                            />
                        </View>

                        <SignInButton
                            title="Send OTP"
                            isLoading={isLoading}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4 items-center">
                    <Text className="text-sm font-semibold text-[#4CAF50]">Back to Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
