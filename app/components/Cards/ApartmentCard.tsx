import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import {Heart, Location} from 'iconsax-react-native';
import tw from 'twrnc';
import {Ionicons} from '@expo/vector-icons';
import {getColor} from '@/config/theme';
import {Link} from 'expo-router';

export const ApartmentCard = () => {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.8;
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  return (
    <Link
      href="/(app)/apartment-details"
      asChild
      style={[
        tw`bg-gray-800 rounded-xl mx-2 h-96 overflow-hidden`,
        {width: cardWidth},
      ]}>
      <Pressable>
        <ImageBackground
          source={require('../../assets/images/walkthrough.jpg')}
          style={tw`w-full h-full relative`}>
          <View style={tw`flex-1 justify-between w-full h-full p-6`}>
            <View style={tw`flex-row justify-between items-center`}>
              <View
                style={tw`bg-black bg-opacity-50 px-3 py-1 rounded-full border border-white`}>
                <Text style={tw`text-white text-xs font-bold`}>
                  ₦66K / night
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setIsFavourite(!isFavourite)}
                style={tw`bg-white p-1.5 rounded-full`}>
                <Heart
                  size={20}
                  color={getColor('shorttiee-primary')}
                  variant={!isFavourite ? 'Bold' : 'Outline'}
                />
              </TouchableOpacity>
            </View>

            <View
              style={tw`w-full p-4 bg-black bg-opacity-50 gap-2 rounded-lg shadow-lg border border-white`}>
              <Text style={tw`text-white font-bold text-xl`} numberOfLines={2}>
                1 Bedroom Shortlet Apartment in Ikeja
              </Text>
              <View style={tw`flex-row items-center`}>
                <Location size={16} color="white" />
                <Text style={tw`text-white text-xs ml-1`}>2.15 miles away</Text>
              </View>
              <View style={tw`flex-row items-center gap-1`}>
                {[...Array(5)].map((_, index) => (
                  <Ionicons
                    key={index}
                    name="star-outline"
                    size={16}
                    color="white"
                  />
                ))}
                <Text style={tw`text-white text-xs ml-1`}>0</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    </Link>
  );
};

export default ApartmentCard;
