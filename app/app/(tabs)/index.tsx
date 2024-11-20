import {HelloWave} from '@/components/HelloWave';
import {getColor} from '@/config/theme';
import {Header} from '@rneui/themed';
import {Heart, HomeHashtag, Notification} from 'iconsax-react-native';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {ApartmentCard} from '@/components/Cards/ApartmentCard';
import tw from 'twrnc';
import {ShortletCard} from '@/components/Cards/ShortletCard';
import {Link} from 'expo-router';
import Constants from 'expo-constants';

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

const topApartments = Array(5).fill({});
const shortlets = Array(10).fill({});

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <Header
        backgroundColor="white"
        containerStyle={{
          borderBottomColor: 'transparent',
          borderWidth: 0,
        }}
      />
      <SafeAreaView className="bg-pax-white flex-1">
        <ScrollView className="flex-1">
          <View
            style={[
              tw`flex-row items-center justify-between w-full px-4 mb-4`,
              {
                marginTop: Platform.select({
                  android: Constants.statusBarHeight - 30,
                  ios: Constants.statusBarHeight - 38,
                  default: Constants.statusBarHeight - 36,
                }),
              },
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
              <Link href="/(app)/favourites" asChild>
                <TouchableOpacity className="items-center justify-center aspect-square">
                  <Heart
                    size={28}
                    color={getColor('shorttiee-primary')}
                    variant="Bold"
                  />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
          <View style={tw`flex-1 gap-8 px-4`}>
            <View className="gap-4">
              <Text className="text-2xl font-semibold">
                Find the best shotlets
              </Text>
              <View style={tw`flex-1 h-28 min-h-24`}>
                <FlashList
                  data={statesDATA}
                  estimatedItemSize={36}
                  keyExtractor={item => item.title}
                  horizontal
                  contentContainerStyle={{paddingBottom: 20}}
                  renderItem={({item: {icon: Icon, title}}) => (
                    <TouchableOpacity className="mx-2">
                      <View className="items-center gap-1">
                        <Icon variant="Bulk" size={64} />
                        <Text>{title}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
            <View style={tw`flex-1 min-h-96 h-[400px]`}>
              <FlashList
                horizontal
                data={topApartments}
                renderItem={() => <ApartmentCard />}
                estimatedItemSize={30}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{paddingBottom: 20}}
              />
            </View>
            <View style={[tw`flex-1`]}>
              <FlashList
                data={shortlets}
                renderItem={() => <ShortletCard />}
                keyExtractor={(_, index) => index.toString()}
                estimatedItemSize={30}
                contentContainerStyle={{paddingBottom: 10}}
                onEndReachedThreshold={0.5}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
