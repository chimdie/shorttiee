import {HelloWave} from '@/components/HelloWave';
import {getColor} from '@/config/theme';
import {HomeHashtag, Notification, SearchNormal1} from 'iconsax-react-native';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {ApartmentCard} from '@/components/Cards/ApartmentCard';
import tw from 'twrnc';
import {ShortletCard} from '@/components/Cards/ShortletCard';
import {Link} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UnControlledTextInput} from '@/components/TextInput';

const statesDATA = [
  {
    title: 'Lagos',
    icon: HomeHashtag,
  },
  {
    title: 'Enugu City',
    icon: HomeHashtag,
  },
  {
    title: 'Port Harcourt',
    icon: HomeHashtag,
  },
  {
    title: 'Calabar',
    icon: HomeHashtag,
  },
  {
    title: 'Abuja',
    icon: HomeHashtag,
  },
  {
    title: 'Kano',
    icon: HomeHashtag,
  },
];
const categories = [
  'Apartment',
  'Beach Villa',
  'Studio Apartment',
  'Vacation Home',
  'Rest Resort',
  'Work studio',
];
const topApartments = Array(5).fill({});
const shortlets = Array(10).fill({});

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="bg-pax-white flex-1">
        <ScrollView className="flex-1">
          <View
            style={[
              tw`flex-row items-center justify-between w-full px-4 mb-4`,
            ]}>
            <View className="flex-row items-center gap-2">
              <HomeHashtag
                size={44}
                variant="Bulk"
                color={getColor('shorttiee-primary')}
              />
              <View className="flex-row items-center gap-1">
                <Text className="text-black text-lg">Hello Username</Text>
                <HelloWave />
              </View>
            </View>
            <View className="flex-row items-center gap-2">
              <TouchableOpacity className="items-center justify-center aspect-square">
                <Notification size={28} color={getColor('shorttiee-primary')} />
              </TouchableOpacity>
              <Link href="/search" asChild>
                <TouchableOpacity className="items-center justify-center aspect-square">
                  <SearchNormal1
                    size={28}
                    color={getColor('shorttiee-primary')}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
          <View style={tw`flex-1 gap-8 px-4`}>
            <View style={tw`gap-2`}>
              <Text className="text-2xl font-semibold">
                Find the best shortlets in
              </Text>

              <FlashList
                data={statesDATA}
                estimatedItemSize={36}
                keyExtractor={item => item.title}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item: {icon: Icon, title}}) => (
                  <TouchableOpacity className="mx-2">
                    <View className="items-center gap-1">
                      <Icon
                        variant="Bulk"
                        size={40}
                        color={getColor('shorttiee-primary')}
                      />
                      <Text>{title}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
            <UnControlledTextInput
              placeholder="Enter Location"
              startContent={
                <SearchNormal1 color={getColor('shorttiee-primary')} />
              }
            />
            <View className="flex-1">
              <FlashList
                data={categories}
                estimatedItemSize={36}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity className="items-center justify-center mx-2 px-6 h-10 rounded-full border border-shorttiee-primary/30">
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View className="flex-1">
              <FlashList
                horizontal
                data={topApartments}
                renderItem={() => <ApartmentCard />}
                estimatedItemSize={30}
                keyExtractor={(_, index) => index.toString()}
                onEndReachedThreshold={0.5}
              />
            </View>
            <View className="flex-1">
              <FlashList
                data={shortlets}
                renderItem={() => <ShortletCard />}
                keyExtractor={(_, index) => index.toString()}
                estimatedItemSize={30}
                onEndReachedThreshold={0.5}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
