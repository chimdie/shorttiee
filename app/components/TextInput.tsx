import React from 'react';
import {
  TextInput as DefaultTextInput,
  TextInputProps,
  Text,
  View,
  Platform,
} from 'react-native';
import {Control, FieldPath, FieldValues, useController} from 'react-hook-form';
import {getColor} from '@/config/theme';

type TextInputT = {
  placeholder?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  label?: string;
  hasError?: boolean;
  erroMessage?: string;
  hasErrorClearButton?: boolean;
  value?: string;
  clearTextInput?: () => void;
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
    <View className="gap-1">
      <Text className="text-sm font-medium text-gray-500">{props.label}</Text>
      <View
        className={`px-4 flex-row rounded-xl bg-gray-100 border ${
          props.hasError ? 'border-red-200 shadow-sm' : 'border-gray-100'
        } items-center justify-center`}>
        {props.startContent}
        <DefaultTextInput
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
        {props.endContent}
      </View>
    </View>
  );
}
