import {
  Text,
  Modal,
  View,
  useWindowDimensions,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  Pressable,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Header} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {SignupSchema} from '@/schema/auth.schema';
import {ControlledTextInput} from '@/components/TextInput';
import {Feather} from '@expo/vector-icons';
import {getColor} from '@/config/theme';
import Constants from 'expo-constants';
import {ShorttieeButton} from '@/components/Button';
import {Link, router} from 'expo-router';
import {CustomCheckBox} from '@/components/CheckBox';
import tw from 'twrnc';

type GenderT = {key: string; label: string};

const genderData: GenderT[] = [
  {key: 'male', label: 'Male'},
  {key: 'female', label: 'Female'},
  {key: 'others', label: 'Others'},
];

export default function Signup() {
  const windowHeight = useWindowDimensions().height;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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

  const handleSelect = (gender: GenderT) => {
    setSelectedGender(gender);
    setModalVisible(false);
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
          <ScrollView className="flex-1">
            <View
              className="flex-1 items-center gap-8"
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
                <Controller
                  control={control}
                  name="gender"
                  render={({field}) => (
                    <View style={tw`w-full gap-1`}>
                      <Pressable
                        style={tw`flex px-4 flex flex-row rounded-xl bg-gray-100 items-center  border border-gray-300 w-full ${Platform.select(
                          {
                            android: 'py-2',
                            ios: 'py-4',
                            default: '',
                          },
                        )}`}
                        onPress={() => setModalVisible(true)}>
                        <Feather
                          name="user-check"
                          size={24}
                          color={getColor('shorttiee-grey-300')}
                        />
                        <Text
                          style={tw`text-sm pl-2 flex-1 ${selectedGender ? 'text-black' : 'text-gray-400'}`}>
                          {selectedGender
                            ? selectedGender.label
                            : 'Select gender'}
                        </Text>
                        <View>
                          <Feather
                            name="chevron-down"
                            size={24}
                            color={getColor('shorttiee-grey-300')}
                          />
                        </View>
                      </Pressable>
                      {errors.gender && (
                        <Text style={tw`text-xs text-red-400 font-normal`}>
                          Select your gender
                        </Text>
                      )}

                      <Modal
                        animationType="slide"
                        transparent
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}>
                        <Pressable
                          style={tw`flex-1 justify-center items-center bg-[#00000080]`}
                          onPress={() => setModalVisible(false)}>
                          <View
                            style={tw`w-4/5 bg-white rounded-lg p-4 items-center`}>
                            {genderData.map(gender => (
                              <Pressable
                                key={gender.key}
                                onPress={() => {
                                  field.onChange(gender.key);
                                  handleSelect(gender);
                                }}
                                style={tw`py-3 w-full items-center`}>
                                <Text style={tw`text-black text-base`}>
                                  {gender.label}
                                </Text>
                              </Pressable>
                            ))}
                          </View>
                        </Pressable>
                      </Modal>
                    </View>
                  )}
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
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
}
