import React from 'react';
import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import {Feather} from '@expo/vector-icons';
import tw from 'twrnc';
import {Link} from 'expo-router';
import {getColor} from '@/config/theme';
import {Heart} from 'iconsax-react-native';

export type ShortletCardT = {
  isVertical?: boolean;
};

export const ShortletCard = ({isVertical}: ShortletCardT) => {
  return (
    <Link
      asChild
      href="/(app)/apartment-details"
      style={tw.style('bg-white rounded-lg gap-4 p-4 mb-4 shadow mx-[1px]')}>
      <Pressable
        style={tw.style(
          isVertical ? 'w-full' : 'flex-row items-center justify-between',
        )}>
        <Image
          source={require('../../assets/images/parlour.jpg')}
          style={tw.style(
            'rounded-lg',
            isVertical ? 'w-full h-40' : 'w-24 h-24',
          )}
        />

        <View style={tw.style(isVertical ? '' : 'flex-1', 'gap-2')}>
          <Text
            numberOfLines={2}
            style={tw`text-lg font-semibold text-gray-800`}>
            3 Bedroom Shortlet Apar in Opebi
          </Text>
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-1`}>
              <Feather name="map-pin" size={16} color="gray" />
              <Text style={tw`text-gray-500 text-sm`}>2.75 miles away</Text>
            </View>
            <View style={tw`flex-row items-center gap-1`}>
              <View style={tw`flex-row items-center`}>
                <Feather
                  name="star"
                  size={16}
                  color={getColor('shorttiee-primary')}
                />
                <Text style={tw`text-sm`}>0.0</Text>
              </View>
              <Text style={tw`text-gray-500 text-sm`}>(0 reviews)</Text>
            </View>
          </View>
          <View style={tw`flex-row items-center justify-between`}>
            <View className="flex-row items-center">
              <Text
                style={[
                  tw`text-lg font-bold`,
                  {color: getColor('shorttiee-primary')},
                ]}>
                ₦144K
              </Text>
              <Text style={tw`text-gray-500 text-xs`}>/night</Text>
            </View>
            <TouchableOpacity
              style={tw`bg-white rounded-full p-2 shadow-md`}
              activeOpacity={0.7}>
              <Heart size={20} color={getColor('shorttiee-primary')} />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
