import {
  View,
  Text,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {OtpInput} from 'react-native-otp-entry';
import tw from 'twrnc';
import {Header} from '@rneui/themed';
import Constants from 'expo-constants';
import {getColor} from '@/config/theme';
import {ShorttieeButton} from '@/components/Button';

// TODO there should be a modal after verifying OTP
export default function OtpScreen() {
  const windowHeight = useWindowDimensions().height;
  const [otpCode, setOtpCode] = useState<string>('');
  const [_isPinReady, setIsPinReady] = useState<boolean>(false); // ? Commented out
  const router = useRouter();
  const {email} = useLocalSearchParams();
  const numberOfDigits = 4;

  const handleSubmitOtp = useCallback((otpCode?: string) => {
    // if (isPinReady) {
    Keyboard.dismiss();
    console.log(otpCode);
    router.navigate('/(tabs)/');
    // }
  }, []);

  return (
    <View className="flex-1 bg-white">
      <Header
        backgroundColor="white"
        centerComponent={
          <Text className="font-semibold text-2xl">Verify OTP</Text>
        }
      />
      <SafeAreaView
        className="bg-pax-white flex-1"
        style={[{minHeight: Math.round(windowHeight)}]}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            className="flex-1 items-center gap-8 px-6"
            style={{marginTop: Constants.statusBarHeight}}>
            <View className="flex-row gap-1 flex-wrap items-center justify-center">
              <Text>Code has been sent to your email address</Text>
              <Text className="font-semibold">{email}</Text>
            </View>
            <OtpInput
              textInputProps={{
                textContentType: 'oneTimeCode',
                autoComplete: 'sms-otp',
                autoFocus: true,
              }}
              numberOfDigits={numberOfDigits}
              onFilled={text => {
                setIsPinReady(true);
                setOtpCode(text);
                Keyboard.dismiss();
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
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
}
