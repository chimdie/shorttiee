import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginSchema} from '@/schema/auth.schema';
import {ControlledTextInput} from '@/components/TextInput';
import {Feather} from '@expo/vector-icons';
import {getColor} from '@/config/theme';
import {ShorttieeButton} from '@/components/Button';
import {Link, router} from 'expo-router';
import {AuthScreenLayout} from '@/layouts/authLayout';

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(LoginSchema),
    defaultValues: {},
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
    router.navigate(`/(auth)/otp?email=${data.email}`);
  };

  return (
    <AuthScreenLayout title="Login">
      <View className="w-full gap-8">
        <ControlledTextInput
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          hasError={!!errors.email}
          erroMessage="Email is required"
          name="email"
          control={control}
          startContent={
            <Feather
              size={24}
              name="mail"
              color={getColor('shorttiee-grey-300')}
            />
          }
        />
        <ControlledTextInput
          placeholder="Password"
          textContentType="password"
          hasError={!!errors.password}
          name="password"
          erroMessage="Password is required"
          control={control}
          secureTextEntry={!showPassword}
          startContent={
            <Feather
              size={24}
              name="lock"
              color={getColor('shorttiee-grey-300')}
            />
          }
          endContent={
            <Feather
              size={24}
              name={showPassword ? 'eye-off' : 'eye'}
              color={getColor('shorttiee-grey-300')}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <ShorttieeButton title="Login" onPress={handleSubmit(onSubmit)} />
        <View className="flex-row items-center justify-between">
          <Link
            href="/(auth)/forgot-password"
            className="text-shorttiee-primary">
            <Text className="font-semibold">Forgot Password</Text>
          </Link>
          <View className="flex-row">
            <Text>Do not have an account? </Text>
            <Link href="/(auth)/signup" className="text-shorttiee-primary">
              <Text className="underline font-semibold">Signup</Text>
            </Link>
          </View>
        </View>
      </View>
    </AuthScreenLayout>
  );
}
