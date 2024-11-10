import {
  Text,
  View,
  useWindowDimensions,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Header} from '@rneui/themed';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ForgotPasswordSchema} from '@/schema/auth.schema';
import {ControlledTextInput} from '@/components/TextInput';
import {Feather} from '@expo/vector-icons';
import {getColor} from '@/config/theme';
import Constants from 'expo-constants';
import {ShorttieeButton} from '@/components/Button';
import {router} from 'expo-router';

export default function ForgotPassword() {
  const windowHeight = useWindowDimensions().height;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordSchema) => {
    console.log(data);
    router.navigate('/(tabs)/');
  };
  return (
    <View className="flex-1 bg-white">
      <Header
        backgroundColor="white"
        centerComponent={
          <Text className="font-semibold text-2xl">Forgot Password</Text>
        }
      />
      <SafeAreaView
        className="bg-pax-white flex-1"
        style={[{minHeight: Math.round(windowHeight)}]}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            className="flex-1 items-center gap-8"
            style={{marginVertical: Constants.statusBarHeight}}>
            <View className="w-full px-6 gap-8">
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
              <ShorttieeButton
                title="Submit"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
}
