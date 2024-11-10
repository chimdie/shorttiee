import React from 'react';
import {Text, TextInput, TextInputProps, View, Platform} from 'react-native';
import {Control, FieldPath, FieldValues, useController} from 'react-hook-form';
import {getColor} from '@/config/theme';
// import {Feather} from '@expo/vector-icons';

type TextInputT = {
  placeholder?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  hasError?: boolean;
  erroMessage?: string;
  hasErrorClearButton?: boolean;
  value?: string;
  clearTextInput?: () => void;
  containerClassName?: string;
} & TextInputProps;

export function ControlledTextInput<T extends FieldValues>({
  name,
  control,
  ...props
}: TextInputT & {name: FieldPath<T>; control: Control<T>}) {
  const {field} = useController({
    control,
    name,
  });

  const clearTextInput = () => {
    field.onChange('');
  };

  return (
    <UnControlledTextInput
      {...props}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      erroMessage={props.erroMessage}
      clearTextInput={clearTextInput}
    />
  );
}

export function UnControlledTextInput(props: TextInputT) {
  return (
    <View className={`space-y-1 border- ${props.containerClassName}`}>
      <View
        className={`px-4 flex flex-row rounded-xl bg-gray-100 ${
          props.hasError ? 'border-red-200 shadow-sm' : 'border-gray-100'
        } items-center justify-center`}>
        <View>{props.startContent}</View>
        <TextInput
          {...props}
          className={`flex-1 font-medium bg-gray-100 text-sm ${props.startContent && 'pl-4'} ${props.className} ${Platform.select(
            {
              android: 'py-2',
              ios: 'py-4',
              default: '',
            },
          )}`}
          placeholderTextColor={getColor('shorttiee-grey-300')}
          placeholderClassName="text-sm"
          placeholder={props.placeholder}
          cursorColor={getColor('shorttiee-primary')}
        />
        <View>{props.endContent}</View>
      </View>
      {props.hasError && (
        <Text className="text-xs text-red-400 font-normal">
          {props.erroMessage}
        </Text>
      )}
    </View>
  );
}

// const Content = (props: {
//   name: React.ComponentProps<typeof Feather>['name'];
//   color: string;
// }) => {
//   return <Feather size={24} style={{marginBottom: -3}} {...props} />;
// };
