import {Stack} from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}