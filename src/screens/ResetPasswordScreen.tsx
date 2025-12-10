
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthParamList } from '@/navigation/AuthNavigator';
import { PasswordField } from '@/components/auth/PasswordField';
import { SignInButton } from '@/components/auth/SignInButton';
import { resetPassword } from '@/api/auth';
import { LogoIcon } from "@/components/auth/LogoIcon";

type Nav = NativeStackNavigationProp<AuthParamList>;
type ResetPasswordRouteProp = RouteProp<AuthParamList, 'ResetPassword'>;

export default function ResetPasswordScreen() {
    const navigation = useNavigation<Nav>();
    const route = useRoute<ResetPasswordRouteProp>();
    const { email, resetToken } = route.params;
    const { control, handleSubmit, watch, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await resetPassword({
                email,
                resetToken,
                newPassword: data.newPassword
            });
            Alert.alert("Success", "Password has been reset successfully.", [
                { text: "Login", onPress: () => navigation.navigate("Login") }
            ]);
        } catch (error: any) {
            console.log("Error resetting password:", error);
            Alert.alert("Error", error.response?.data?.message || "Failed to reset password.");
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
                    <Text className="text-3xl font-bold text-gray-900">Reset Password</Text>
                    <Text className="mt-2 text-center text-base text-gray-600">Enter your new password</Text>
                </View>

                <View className="mb-6 rounded-3xl bg-white p-4 shadow-md">
                    <View className="px-4 py-4">
                        <View className="mb-5">
                            <PasswordField
                                name="newPassword"
                                control={control}
                                placeholder="New Password"
                                label="New Password"
                                rules={{
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                                }}
                                error={errors.newPassword?.message as string | undefined}
                            />
                        </View>

                        <View className="mb-5">
                            <PasswordField
                                name="confirmPassword"
                                control={control}
                                placeholder="Confirm Password"
                                label="Confirm Password"
                                rules={{
                                    required: "Please confirm your password",
                                    validate: (val: string) => {
                                        if (watch('newPassword') != val) {
                                            return "Your passwords do not match";
                                        }
                                    }
                                }}
                                error={errors.confirmPassword?.message as string | undefined}
                            />
                        </View>

                        <SignInButton
                            title="Reset Password"
                            isLoading={isLoading}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
