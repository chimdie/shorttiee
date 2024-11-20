import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacityProps,
  Alert,
} from 'react-native';
import React, {forwardRef, useState} from 'react';
import {Avatar, BottomSheet, Header} from '@rneui/themed';
import {getColor} from '@/config/theme';
import tw from 'twrnc';
import {Feather} from '@expo/vector-icons';
import {Link, router} from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import {ShorttieeButton} from '@/components/Button';
import {version} from '../../package.json';
// import * as ImagePicker from 'expo-image-picker';

export default function Profile() {
  const [referrerCode] = useState('ESC-MmJ60691');
  const [isVisible, setIsVisible] = useState(false);
  const [image, _setImage] = useState<string | null>(null);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(referrerCode);
    Alert.alert('Referrral Code', 'Referrral Code copied to clipboard!', [
      {text: 'OK'},
    ]);
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        backgroundColor="white"
        containerStyle={{
          borderBottomColor: 'transparent',
          borderWidth: 0,
        }}
        leftComponent={
          <Pressable onPress={() => router.back()}>
            <Feather name="chevron-left" size={32} color="black" />
          </Pressable>
        }
        rightComponent={
          <Link href="/(app)/edit-profile" asChild>
            <TouchableOpacity className="items-center justify-center aspect-square">
              <Feather
                name="edit"
                size={28}
                color={getColor('shorttiee-primary')}
              />
            </TouchableOpacity>
          </Link>
        }
        centerComponent={
          <Text className="font-semibold text-2xl">Profile</Text>
        }
      />
      <SafeAreaView className="bg-white flex-1">
        <ScrollView className="flex-1">
          <View style={tw`flex-1 px-4 gap-8`}>
            <View className="flex-row items-center gap-4">
              <TouchableOpacity
                onPress={() => setIsVisible(true)}
                className="aspect-square rounded-full items-center justify-center">
                <Avatar
                  source={{uri: image ? image : 'https://bit.ly/dan-abramov'}}
                  size={100}
                  rounded
                />
                <Feather
                  name="image"
                  size={20}
                  color="black"
                  className="absolute bottom-1 right-1"
                />
              </TouchableOpacity>
              <View className="gap-4">
                <Text className="text-xl font-bold text-gray-800 capitalize">
                  zammie ugochukwu
                </Text>
                <TouchableOpacity
                  className="flex-row items-center justify-between bg-shorttiee-primary-100 px-4 py-2 rounded-lg"
                  onPress={copyToClipboard}>
                  <Text style={tw`text-gray-600`}>{referrerCode}</Text>
                  <Feather
                    name="copy"
                    size={16}
                    color={getColor('shorttiee-primary')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="gap-2">
              <ProfileQuickButton
                label="Account Verification"
                icon="user-check"
                hasStatus
                status="Not Verified"
              />
              <ProfileQuickButton label="Payment History" icon="credit-card" />
              <Link href="/(app)/favourites" asChild>
                <ProfileQuickButton label="Favourites" icon="heart" />
              </Link>
              <ProfileQuickButton
                label="Payout Bank Account"
                icon="credit-card"
              />
              <ProfileQuickButton label="Notifications" icon="bell" />
              <ProfileQuickButton label="Security" icon="shield" />
              <ProfileQuickButton
                label="Current Version"
                icon="airplay"
                extras={
                  <Text className="text-center text-gray-500">{version}</Text>
                }
              />
              <ProfileQuickButton label="Logout" icon="log-out" isLogout />
            </View>
            <View className="mb-8">
              <ShorttieeButton
                icon={
                  <Feather
                    name="trash"
                    size={20}
                    className="mr-4"
                    color="#dc2626"
                  />
                }
                title="Delete Account"
                variant="danger"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomSheet
        modalProps={{presentationStyle: 'overFullScreen'}}
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}>
        <View className="flex-1 bg-white rounded-l-xl rounded-r-xl p-4 pt-10 gap-6 h-72">
          <View className="gap-8">
            <View className="pb-4 border-b border-gray-200">
              <Text className="text-center">Select Image</Text>
            </View>
            <View className="gap-4">
              <ShorttieeButton title="Camera" />
              <ShorttieeButton title="Gallery" />
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

type ProfileQuickButtonT = {
  label: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  status?: 'Verified' | 'Not Verified';
  hasStatus?: boolean;
  isLogout?: boolean;
  extras?: React.ReactNode;
} & TouchableOpacityProps;

const ProfileQuickButton = forwardRef<TouchableOpacity, ProfileQuickButtonT>(
  ({label, icon, status, hasStatus, isLogout, ...props}, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...props}
        className={`flex-row items-center justify-between py-4 ${
          isLogout ? '' : 'border-b'
        } border-gray-200`}>
        <View style={tw`flex-row items-center gap-4`}>
          <Feather name={icon} size={24} color={isLogout ? 'red' : 'gray'} />
          <Text className={`${isLogout ? 'text-red-500' : 'text-black'}`}>
            {label}
          </Text>
        </View>
        {(hasStatus && (
          <View
            className={`px-4 py-2 rounded-lg ${
              status === 'Verified' ? 'bg-green-100' : 'bg-amber-100'
            }`}>
            <Text
              className={`${
                status === 'Verified' ? 'text-green-600' : 'text-amber-500'
              }`}>
              {status}
            </Text>
          </View>
        )) ||
          props.extras}
      </TouchableOpacity>
    );
  },
);
