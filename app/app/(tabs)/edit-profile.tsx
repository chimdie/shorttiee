import {Platform, Pressable, Text, View} from 'react-native';
import React from 'react';
import {AuthScreenLayout} from '@/layouts/authLayout';
import {EditProfileSchema} from '@/schema/auth.schema';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ControlledTextInput} from '@/components/TextInput';
import {Feather} from '@expo/vector-icons';
import {getColor} from '@/config/theme';
import {ShorttieeButton} from '@/components/Button';
import {useAtom} from 'jotai';
import {savedUserInfo} from '@/atoms/user.atom';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import tw from 'twrnc';
import {APISDK} from '@/sdk';
import {UpdateUserDto} from '@/sdk/generated';
import {QueryKeys} from '@/constants/queryKeys';

type EditProfile = Pick<
  EditProfileSchema,
  'firstName' | 'lastName' | 'mobileNumber'
>;

export default function Editprofile() {
  const [user] = useAtom(savedUserInfo);
  const querClient = useQueryClient();

  const updateProfileMutaion = useMutation({
    mutationFn: (formData: UpdateUserDto) => {
      return APISDK.UserService.patchApiV1UsersProfile(formData);
    },
    onSuccess: () => {
      // setUser(data.data);
      querClient.invalidateQueries({queryKey: [QueryKeys.user]});
    },
    onError(error) {
      console.log({error});
    },
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<EditProfileSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      email: user?.email,
      gender: 'F',
      firstName: user?.firstName,
      lastName: user?.lastName,
      mobileNumber: user?.mobileNumber,
    },
  });

  const onSubmit = (data: EditProfile) => {
    updateProfileMutaion.mutate(data);
  };

  return (
    <AuthScreenLayout title="Edit Profile" hasBackbutton>
      <View className="w-full gap-16">
        <View className="gap-8">
          <ControlledTextInput
            defaultValue={user?.firstName}
            // editable={!!updateProfileMutaion.isPending}
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
            defaultValue={user?.lastName}
            // editable={!!updateProfileMutaion.isPending}
            control={control}
            name="lastName"
            placeholder="Last Name"
            containerClassName="flex-1"
            autoComplete="cc-family-name"
            textContentType="familyName"
            hasError={!!errors.lastName}
            erroMessage="Your last Name is required"
          />
          <Pressable
            style={tw`flex px-4 flex flex-row rounded-xl bg-gray-100 items-center  border border-gray-300 w-full ${Platform.select(
              {
                android: 'py-2',
                ios: 'py-4',
                default: '',
              },
            )}`}>
            <Feather
              name="user-check"
              size={24}
              color={getColor('shorttiee-grey-300')}
            />
            <Text style={tw`text-sm pl-2 flex-1 text-black`}>
              {user?.gender === 'M' ? 'Male' : 'Female'}
            </Text>
            <View>
              <Feather
                name="chevron-down"
                size={24}
                color={getColor('shorttiee-grey-300')}
              />
            </View>
          </Pressable>
          <ControlledTextInput
            defaultValue={user?.email}
            editable={false}
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
            defaultValue={user?.mobileNumber}
            // editable={!!updateProfileMutaion.isPending}
            placeholder="+2348 06557 1233"
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
        </View>
        <ShorttieeButton
          className="w-full"
          title="Update"
          onPress={handleSubmit(onSubmit)}
          loading={updateProfileMutaion.isPending}
        />
      </View>
    </AuthScreenLayout>
  );
}
