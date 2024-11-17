import React, {PropsWithChildren} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {TickSquare, Stop} from 'iconsax-react-native';
import {getColor} from '@/config/theme';

type CheckboxT = {
  isSelected: boolean;
  onChange: () => void;
} & PropsWithChildren;

export function CustomCheckBox(props: CheckboxT) {
  return (
    <TouchableOpacity onPress={() => props.onChange()} {...props}>
      <View className="flex-row items-center space-x-2">
        {props.isSelected ? (
          <TickSquare
            variant="Bold"
            size={24}
            color={getColor('shorttiee-primary')}
          />
        ) : (
          <Stop size={24} color={getColor('shorttiee-grey-300')} />
        )}
      </View>
    </TouchableOpacity>
  );
}
