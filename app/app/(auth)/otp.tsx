import {View, Text, Keyboard} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {OtpInput} from 'react-native-otp-entry';
import tw from 'twrnc';
import {getColor} from '@/config/theme';
import {ShorttieeButton} from '@/components/Button';
import {AuthScreenLayout} from '@/layouts/authLayout';

// TODO there should be a modal after verifying OTP
export default function OtpScreen() {
  const [otpCode, setOtpCode] = useState<string>('');
  const router = useRouter();
  const {email} = useLocalSearchParams();
  const numberOfDigits = 4;

  const handleSubmitOtp = useCallback((otpCode?: string) => {
    if (otpCode && !/\d{4}/.exec(otpCode)?.input) {
      return;
    }
    Keyboard.dismiss();
    console.log(otpCode);
    router.navigate('/(tabs)/');
  }, []);

  return (
    <AuthScreenLayout title="Create Account" hasBackbutton>
      <>
        <View className="flex-row gap-1 flex-wrap items-center justify-center">
          <Text>Code has been sent to your email address</Text>
          <Text className="font-semibold">{email}</Text>
        </View>
        <OtpInput
          textInputProps={{
            textContentType: 'oneTimeCode',
            autoComplete: 'sms-otp',
            autoFocus: true,
            onSubmitEditing() {
              handleSubmitOtp(otpCode);
            },
          }}
          numberOfDigits={numberOfDigits}
          onTextChange={t => {
            setOtpCode(t);
          }}
          onFilled={text => {
            setOtpCode(text);
            handleSubmitOtp(text);
          }}
          theme={{
            focusStickStyle: tw`h-5`,
            pinCodeContainerStyle: tw`min-h-0 h-10 aspect-square rounded-lg border w-20`,
            pinCodeTextStyle: tw`text-white text-2xl font-semibold`,
            focusedPinCodeContainerStyle: {
              borderWidth: 2,
              borderColor: getColor('shorttiee-primary'),
            },
            filledPinCodeContainerStyle: {
              backgroundColor: getColor('shorttiee-primary'),
            },
          }}
        />
        <View className="w-full">
          <ShorttieeButton
            title="Submit"
            onPress={() => handleSubmitOtp(otpCode)}
          />
        </View>
      </>
    </AuthScreenLayout>
  );
}
