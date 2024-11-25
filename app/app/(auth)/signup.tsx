import {Text, View} from 'react-native';
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
import {GenderSelector} from '@/components/GenderSelect';

type GenderT = {key: string; label: string};

export default function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedGender, setSelectedGender] = useState<GenderT>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = (data: SignupSchema) => {
    if (isSelected) {
      console.log({...data});
      router.navigate(`/(auth)/otp?email=${data.email}`);
    }
  };

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
            hasError={!!errors.phone}
            erroMessage={errors.phone?.message}
            name="phone"
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
          <ControlledTextInput
            control={control}
            name="businessName"
            placeholder="Business Name (Optional)"
            autoComplete="organization-title"
            textContentType="organizationName"
            hasError={!!errors.businessName}
            erroMessage="Provide your business name"
            startContent={
              <Feather
                size={24}
                name="briefcase"
                color={getColor('shorttiee-grey-300')}
              />
            }
          />
          <View className="flex-row items-center gap-2">
            <CustomCheckBox
              isSelected={isSelected}
              onChange={() => setIsSelected(!isSelected)}
            />
            <Text>I agree to terms and services</Text>
          </View>
          <ShorttieeButton
            className="w-full"
            title="Signup"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <View className="flex flex-row gap-2">
          <Text>Already have an account?</Text>
          <Link href="/(auth)/" className="text-shorttiee-primary">
            <Text className="underline font-semibold">Login</Text>
          </Link>
        </View>
      </>
    </AuthScreenLayout>
  );
}
