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
import {SignupSchema} from '@/schema/auth.schema';
import {ControlledTextInput} from '@/components/TextInput';
import {Feather} from '@expo/vector-icons';
import {getColor} from '@/config/theme';
import Constants from 'expo-constants';
import {ShorttieeButton} from '@/components/Button';
import {router} from 'expo-router';

// const gender = [
//   {key: 'male', labe: 'Male'},
//   {key: 'female', labe: 'Female'},
//   {key: 'others', labe: 'Others'},
// ];

export default function Signup() {
  const windowHeight = useWindowDimensions().height;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = (data: SignupSchema) => {
    console.log(data);
    router.replace('/(tabs)/');
  };
  return (
    <View className="flex-1 bg-white">
      <Header
        backgroundColor="white"
        centerComponent={
          <Text className="font-semibold text-2xl">Create Account</Text>
        }
      />
      <SafeAreaView
        className="bg-pax-white flex-1"
        style={[{minHeight: Math.round(windowHeight)}]}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            className="flex-1 items-center justify-center- gap-8"
            style={{marginTop: Constants.statusBarHeight}}>
            <View className="w-full px-6 gap-8">
              <View className="flex-row gap-4">
                <ControlledTextInput
                  control={control}
                  name="firstName"
                  placeholder="First Name"
                  containerClassName="flex-1"
                  autoComplete="cc-given-name"
                  textContentType="name"
                />
                <ControlledTextInput
                  control={control}
                  name="lastName"
                  placeholder="Last Name"
                  containerClassName="flex-1"
                  autoComplete="cc-family-name"
                  textContentType="familyName"
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
                    name="flag"
                    color={getColor('shorttiee-grey-300')}
                  />
                }
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
                startContent={
                  <Feather
                    size={24}
                    name="map-pin"
                    color={getColor('shorttiee-grey-300')}
                  />
                }
              />
              <ShorttieeButton
                className="w-full"
                title="Signup"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
}
