
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/screens/LoginScreen';
import RegisterScreen from '@/screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export type AuthParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    VerifyOtp: { email: string };
    ResetPassword: { email: string, resetToken: string };
}

export default function AuthNavigator<AuthParamList>() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={require("@/screens/ForgotPasswordScreen").default} />
            <Stack.Screen name="VerifyOtp" component={require("@/screens/VerifyOtpScreen").default} />
            <Stack.Screen name="ResetPassword" component={require("@/screens/ResetPasswordScreen").default} />
        </Stack.Navigator>
    );
}
