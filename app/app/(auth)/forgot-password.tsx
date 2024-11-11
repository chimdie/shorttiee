import {View} from 'react-native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ForgotPasswordSchema} from '@/schema/auth.schema';
import {ControlledTextInput} from '@/components/TextInput';
import {Feather} from '@expo/vector-icons';
import {getColor} from '@/config/theme';
import {ShorttieeButton} from '@/components/Button';
import {router} from 'expo-router';
import {AuthScreenLayout} from '@/layouts/authLayout';

export default function ForgotPassword() {
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
    <AuthScreenLayout title="Forgot Password" hasBackbutton>
      <View className="w-full gap-8">
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
        <ShorttieeButton title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </AuthScreenLayout>
  );
}
