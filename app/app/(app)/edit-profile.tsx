import {View} from 'react-native';
import React, {useState} from 'react';
import {AuthScreenLayout} from '@/layouts/authLayout';
import {EditProfileSchema} from '@/schema/auth.schema';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ControlledTextInput} from '@/components/TextInput';
import {Feather} from '@expo/vector-icons';
import {getColor} from '@/config/theme';
import {GenderSelector, GenderT} from '@/components/GenderSelect';
import {ShorttieeButton} from '@/components/Button';

export default function Editprofile() {
  const [selectedGender, setSelectedGender] = useState<GenderT>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<EditProfileSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {},
  });

  const onSubmit = (data: EditProfileSchema) => {
    console.log(data);
  };

  return (
    <AuthScreenLayout title="Edit Profile" hasBackbutton>
      <View className="w-full gap-16">
        <View className="gap-8">
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
            endContent={
              <Feather
                size={24}
                name="mail"
                color={getColor('shorttiee-grey-300')}
              />
            }
          />
          <ControlledTextInput
            placeholder="+2348 06557 1233"
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
        </View>
        <ShorttieeButton
          className="w-full"
          title="Update"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </AuthScreenLayout>
  );
}
