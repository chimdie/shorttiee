import {
  Text,
  View,
  useWindowDimensions,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {Header} from '@rneui/themed';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginSchema} from '@/schema/auth.schema';
import {ControlledTextInput} from '@/components/TextInput';
import {Feather} from '@expo/vector-icons';
import {getColor} from '@/config/theme';
import Constants from 'expo-constants';
import {ShorttieeButton} from '@/components/Button';
import {Link, router} from 'expo-router';

export default function Login() {
  const windowHeight = useWindowDimensions().height;
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
    router.replace('/(auth)/otp');
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        backgroundColor="white"
        centerComponent={<Text className="font-semibold text-2xl">Login</Text>}
      />
      <SafeAreaView
        className="bg-pax-white flex-1"
        style={[{minHeight: Math.round(windowHeight)}]}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            className="flex-1 items-center justify-center- gap-8"
            style={{marginTop: Constants.statusBarHeight}}>
            <View className="w-full px-6 gap-8">
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
                <Link href="/" className="text-shorttiee-primary">
                  <Text className="font-semibold">Forgot Password</Text>
                </Link>
                <View className="flex-row">
                  <Text>Do not have an account? </Text>
                  <Link
                    href="/(auth)/signup"
                    className="text-shorttiee-primary">
                    <Text className="underline font-semibold">Signup</Text>
                  </Link>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
}
