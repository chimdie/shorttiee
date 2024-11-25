import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Share,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import tw from 'twrnc';
import {router} from 'expo-router';
import {Header} from '@rneui/themed';
import {Heart, I3DRotate} from 'iconsax-react-native';
import {getColor} from '@/config/theme';
import {ShorttieeButton} from '@/components/Button';

export default function ApartmentDetailScreen() {
  return (
    <View className="flex-1 bg-white">
      <Header
        backgroundColor="white"
        containerStyle={{
          borderBottomColor: 'transparent',
          borderWidth: 0,
        }}
      />
      <SafeAreaView className="flex-1 justify-between">
        <ScrollView className="flex-1 bg-white gap-8">
          <View className="relative">
            <Image
              source={require('../../assets/images/parlour.jpg')}
              style={tw`w-full h-72`}
            />
            <View className="absolute p-4 flex-row justify-between w-full">
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-white p-2 rounded-full">
                <Ionicons name="arrow-back" size={20} color="black" />
              </TouchableOpacity>
              <View className="flex-row gap-2">
                <TouchableOpacity className="bg-white p-2 rounded-full">
                  <I3DRotate size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-white p-2 rounded-full">
                  <Heart size={20} color={getColor('shorttiee-primary')} />
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-white p-2 rounded-full"
                  onPress={() =>
                    Share.share({title: 'Share', message: 'sharing is caring'})
                  }>
                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="p-4 gap-6 overflow-y-scroll">
            <View>
              <Text className="text-lg font-semibold text-gray-800">
                2 Bedroom Shortlet Apartment in Ikeja
              </Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-gray-500">Ikeja, Lagos</Text>
                <View className="flex-row">
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color={getColor('shorttiee-primary')}
                  />
                  <Text className="text-shorttiee-primary">
                    2.13 miles away
                  </Text>
                </View>
              </View>
            </View>
            <View className="bg-shorttiee-primary/10 p-4 rounded-lg flex-row items-center gap-2">
              <Ionicons name="person-outline" size={24} color="black" />
              <View className="gap-1">
                <Text className="">Hosted by Solomon</Text>
                <Text className="text-gray-500">Contact</Text>
              </View>
            </View>
            <View className="gap-2">
              <Text className="text-lg font-semibold text-gray-800">
                Experience 360° View
              </Text>

              <ShorttieeButton title="Tap to view" />
            </View>
            <View className="gap-2">
              <Text className="text-lg font-semibold text-gray-800">
                Details
              </Text>
              <View className="flex-row justify-between gap-4">
                <DetailsCard icon="bed-outline" title="Apartment" />
                <DetailsCard icon="briefcase-outline" title="Bedrooms" />
                <DetailsCard icon="water-outline" title="Bathroom" />
              </View>
            </View>
            <View>
              <Text className="text-lg font-semibold text-gray-800">
                Description
              </Text>
              <Text>
                A fully furnished house that promises a perfect home away from
                home experience.
              </Text>
            </View>
          </View>
        </ScrollView>
        <View className="flex-row justify-between items-center p-4 bg-white border- w-full gap-x-6">
          <View className="flex-row items-center">
            <Text className="text-lg font-bold text-shorttiee-primary">
              ₦96K
            </Text>
            <Text className="text-gray-500">/night</Text>
          </View>

          <View className="flex-1">
            <ShorttieeButton title="Book Now" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const DetailsCard = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
}) => {
  return (
    <View className="items-center p-4 rounded-xl overflow-hidden border border-gray-300 flex-grow gap-1">
      <Ionicons name={icon} size={36} color="gray" />
      <Text className="text-gray-500">{title}</Text>
    </View>
  );
};
