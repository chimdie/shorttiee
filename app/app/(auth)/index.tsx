import {Pressable, Text, View} from 'react-native';
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
import {useMutation} from '@tanstack/react-query';
import {LoginDto} from '@/sdk/generated';
import {APISDK} from '@/sdk';
import {storedUserTokenAtom} from '@/atoms/user.atom';
import {useSetAtom} from 'jotai';

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const setStoredToken = useSetAtom(storedUserTokenAtom);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (payload: LoginDto) =>
      APISDK.AuthenticationService.postApiV1AuthLogin(payload),
    onSuccess(data) {
      if (data) {
        const {token} = data.data;

        APISDK.OpenAPI.TOKEN = token;
        setStoredToken(token);
        router.replace('/(tabs)');
      }
    },
  });

  const onSubmit = (data: LoginSchema) => {
    loginMutation.mutate(data);
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
            asChild
            href="/(auth)/forgot-password"
            className="text-shorttiee-primary">
            <Pressable hitSlop={20}>
              <Text className="font-semibold">Forgot Password</Text>
            </Pressable>
          </Link>
          <View className="flex-row">
            <Text>Do not have an account? </Text>
            <Link
              asChild
              href="/(auth)/signup"
              className="text-shorttiee-primary">
              <Pressable hitSlop={20}>
                <Text className="underline font-semibold">Signup</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </AuthScreenLayout>
  );
}
