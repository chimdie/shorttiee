import {
  View,
  Text,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'expo-router';
import {OtpInput} from 'react-native-otp-entry';
import tw from 'twrnc';
import {Header} from '@rneui/themed';
import Constants from 'expo-constants';
import {getColor} from '@/config/theme';

export default function OtpScreen() {
  const windowHeight = useWindowDimensions().height;
  const [otpCode, setOtpCode] = useState<string>('');
  const [isPinReady, setIsPinReady] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmitOtp = useCallback((otpCode: string) => {
    if (isPinReady) {
      Keyboard.dismiss();
      console.log(otpCode);
    }
  }, []);

  useEffect(() => {
    // handleSubmitOtp
  }, [isPinReady]);

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
            className="flex-1 items-center justify-center gap-8 px-6"
            // style={{ marginTop: Constants.statusBarHeight }}
          >
            <OtpInput
              textInputProps={{
                textContentType: 'oneTimeCode',
                autoComplete: 'sms-otp',
                autoFocus: true,
              }}
              numberOfDigits={4}
              onFilled={text => {
                setIsPinReady(true);
                setOtpCode(text);
                // Keyboard.dismiss();
              }}
              theme={{
                focusStickStyle: tw`h-5`,
                pinCodeContainerStyle: tw`min-h-0 h-20 aspect-square rounded-lg border w-20`,
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
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
}
