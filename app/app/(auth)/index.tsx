import {
  Text,
  View,
  Image,
  useWindowDimensions,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {Header} from '@rneui/themed';
import {ArrowCircleLeft} from 'iconsax-react-native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginSchema} from '@/schema/auth.schema';
import {ControlledTextInput} from '@/components/TextInput';
import {Feather} from '@expo/vector-icons';

export default function Login() {
  const windowHeight = useWindowDimensions().height;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(LoginSchema),
    defaultValues: {},
  });

  return (
    <View className="flex-1 bg-white">
      <Header
        backgroundColor="white"
        leftComponent={
          <Pressable>
            <ArrowCircleLeft />
          </Pressable>
        }
      />
      <SafeAreaView
        className="bg-pax-white flex-1"
        style={[{minHeight: Math.round(windowHeight)}]}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="flex-1 items-center justify-center- gap-8">
            <View className="w-full px-6 gap-8">
              <ControlledTextInput
                placeholder="preciousfredrick740@gmail.com"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                hasError={!!errors.email}
                name="email"
                control={control}
                startContent={<Feather name="mail" />}
              />
              <ControlledTextInput
                placeholder="preciousfredrick740@gmail.com"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                hasError={!!errors.email}
                name="password"
                control={control}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
}
