import {Alert, Pressable, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {SignupSchema} from '@/schema/auth.schema';
import {ControlledTextInput} from '@/components/TextInput';
import {Feather} from '@expo/vector-icons';
import {getColor} from '@/config/theme';
import {ShorttieeButton} from '@/components/Button';
import {Link, router} from 'expo-router';
import {CustomCheckBox} from '@/components/CheckBox';
import {AuthScreenLayout} from '@/layouts/authLayout';
import {GenderSelector, GenderT} from '@/components/GenderSelect';
import {useMutation} from '@tanstack/react-query';
import {APISDK} from '@/sdk';
import {RegisterDto} from '@/sdk/generated';
import {apiErrorParser} from '@/utils/errorParser';
import {storedUserTokenAtom} from '@/atoms/user.atom';
import {useSetAtom} from 'jotai';

export default function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedGender, setSelectedGender] = useState<GenderT>();
  const [apiError, setApiError] = useState<string | null>(null);
  const setStoredToken = useSetAtom(storedUserTokenAtom);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(SignupSchema),
  });

  const signupMutation = useMutation({
    mutationFn: (formData: RegisterDto) =>
      APISDK.AuthenticationService.postApiV1AuthRegister(formData),
    onSuccess(data) {
      if (data) {
        const {token} = data.data;

        APISDK.OpenAPI.TOKEN = token;
        setStoredToken(token);
        router.replace('/(tabs)');
      }
    },
    onError(error) {
      const parsedError = apiErrorParser(error);
      setApiError(parsedError.message);
    },
  });

  const onSubmit = (data: SignupSchema) => {
    if (isSelected) {
      signupMutation.mutate(data);
    }
  };

  if (__DEV__) {
    apiError && Alert.alert(apiError);
  }

  return (
    <AuthScreenLayout title="Create Account" hasBackbutton>
      <>
        <View className="w-full gap-8">
          <View className="flex-row gap-4">
            <ControlledTextInput
              control={control}
              name="firstName"
              placeholder="First Name"
              containerClassName="flex-1"
              autoComplete="cc-given-name"
              textContentType="name"
              hasError={!!errors.firstName}
              erroMessage="Your first Name is required"
            />
            <ControlledTextInput
              control={control}
              name="lastName"
              placeholder="Last Name"
              containerClassName="flex-1"
              autoComplete="cc-family-name"
              textContentType="familyName"
              hasError={!!errors.lastName}
              erroMessage="Your last Name is required"
            />
          </View>
          <ControlledTextInput
            placeholder="Your number"
            keyboardType="number-pad"
            textContentType="telephoneNumber"
            autoComplete="tel-national"
            hasError={!!errors.mobileNumber}
            erroMessage={errors.mobileNumber?.message}
            name="mobileNumber"
            control={control}
            startContent={
              <Feather
                size={24}
                name="phone"
                color={getColor('shorttiee-grey-300')}
              />
            }
          />
          <GenderSelector
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            control={control}
            errors={errors.gender}
          />
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
          <ControlledTextInput
            control={control}
            name="address"
            placeholder="Your Home Address"
            autoComplete="street-address"
            textContentType="fullStreetAddress"
            hasError={!!errors.address}
            erroMessage="Provide your home address"
            startContent={
              <Feather
                size={24}
                name="map-pin"
                color={getColor('shorttiee-grey-300')}
              />
            }
          />
          <Pressable
            hitSlop={20}
            onPress={() => setIsSelected(!isSelected)}
            className="flex-row items-center gap-2">
            <CustomCheckBox
              isSelected={isSelected}
              onChange={() => setIsSelected(!isSelected)}
            />
            <Text>I agree to terms and services</Text>
          </Pressable>
          <ShorttieeButton
            className="w-full"
            title="Signup"
            onPress={handleSubmit(onSubmit)}
            disabled={!isSelected || signupMutation.isPending}
            loading={signupMutation.isPending}
          />
        </View>
        <View className="flex flex-row gap-2">
          <Text>Already have an account?</Text>
          <Link href="/(auth)" className="text-shorttiee-primary">
            <Text className="underline font-semibold">Login</Text>
          </Link>
        </View>
      </>
    </AuthScreenLayout>
  );
}
