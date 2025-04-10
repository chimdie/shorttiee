import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import {Feather} from '@expo/vector-icons';
import tw from 'twrnc';
import {Link} from 'expo-router';
import {getColor} from '@/config/theme';
import {Heart} from 'iconsax-react-native';
import {ListingsDto} from '@/sdk/generated';
import {ListRenderItemInfo} from '@shopify/flash-list';
import {currencyParser} from '@/utils/currencyParser';

export type ShortletCardT = {
  isVertical?: boolean;
  data: ListRenderItemInfo<ListingsDto>;
};

export const ShortletCard = ({isVertical, data}: ShortletCardT) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const {item} = data;

  return (
    <Link
      asChild
      href={{
        pathname: '/(tabs)/apartment-details',
        params: {id: item.id},
      }}
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
            {item.name ?? ''}
          </Text>
          <View style={tw`flex-row items-center gap-1`}>
            <Feather name="map-pin" size={16} color="gray" />
            <Text style={tw`text-gray-500 text-sm`}>2.75 miles away</Text>
          </View>
          <View style={tw`flex-row items-center gap-1`}>
            <View style={tw`flex-row items-center gap-1`}>
              <Feather
                name="star"
                size={16}
                color={getColor('shorttiee-primary')}
              />
              <Text style={tw`text-sm`}>0.0</Text>
            </View>
            <Text style={tw`text-gray-500 text-sm`}>(0 reviews)</Text>
          </View>
          <View style={tw`flex-row items-center justify-between`}>
            <View className="flex-row items-center">
              <Text
                style={[
                  tw`text-lg font-bold`,
                  {color: getColor('shorttiee-primary')},
                ]}>
                {item.rate && currencyParser(item.rate)}
              </Text>
              <Text style={tw`text-gray-500 text-xs`}>/night</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsFavourite(!isFavourite)}
              style={tw`bg-white rounded-full p-2 shadow-md`}>
              <Heart
                size={20}
                color={getColor('shorttiee-primary')}
                variant={isFavourite ? 'Bold' : 'Outline'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
