import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {Text, View} from 'react-native';

export function ApartmentDetails({
  title,
  icon,
}: {
  title: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
}) {
  return (
    <View className="items-center p-4 rounded-xl overflow-hidden border border-gray-300 flex-grow gap-1">
      <Ionicons name={icon} size={36} color="gray" />
      <Text className="text-gray-500">{title}</Text>
    </View>
  );
}
