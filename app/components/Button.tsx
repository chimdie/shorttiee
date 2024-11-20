import React from 'react';
import {Button as ButtonUI, ButtonProps} from '@rneui/themed';
import {getColor} from '@/config/theme';

const variants = {
  primary: {
    text: 'white',
    box: getColor('shorttiee-primary'),
  },
  light: {
    text: getColor('shorttiee-primary'),
    box: getColor('shorttiee-primary-100'),
  },
  ghost: {
    text: getColor('shorttiee-grey-400'),
    box: 'transparent',
  },
  danger: {
    text: '#dc2626',
    box: getColor('shorttiee-primary-100'),
  },
};

type Variant = keyof typeof variants;

type PaxButtonT = {
  variant?: Variant;
} & ButtonProps;

export function ShorttieeButton(props: PaxButtonT) {
  const boxStyleVariant = variants[props.variant || 'primary'].box;
  const textStyleVariant = variants[props.variant || 'primary'].text;

  return (
    <ButtonUI
      {...props}
      size="lg"
      radius={12}
      buttonStyle={{
        borderWidth: props.variant === 'ghost' ? 1 : 0,
        borderColor: getColor('shorttiee-grey-300'),
      }}
      color={boxStyleVariant}
      titleStyle={{
        color: textStyleVariant,
        fontWeight: '500',
        fontSize: 16,
      }}>
      {props.title}
    </ButtonUI>
  );
}
