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
import {QueryKeys} from '@/constants/queryKeys';
import {APISDK} from '@/sdk';
import {useQuery} from '@tanstack/react-query';
import {useAtom} from 'jotai';
import {savedUserInfo} from '@/atoms/user.atom';

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

export default function HomeScreen() {
  const [user, setUser] = useAtom(savedUserInfo);

  const {isLoading: isUserLoading} = useQuery({
    queryKey: [QueryKeys.user],
    queryFn: () => APISDK.UserService.getApiV1UsersProfile(),
    select(data) {
      if (data) setUser(data.data);
    },
  });

  const listingQuery = useQuery({
    queryKey: ['listing'],
    queryFn: () => APISDK.ListingService.getApiV1Listings(),
  });

  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => APISDK.CategoryService.getApiV1Categories(),
  });

  console.log(listingQuery.data?.data);

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
                <Text className="text-black text-lg">
                  Hello {isUserLoading ? '' : user?.firstName}
                </Text>
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
            <View
              className="flex-1"
              style={{
                flex: 1,
              }}>
              <FlashList
                data={categoryQuery.data?.data || []}
                estimatedItemSize={36}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => console.log(item)}
                    className="items-center justify-center mx-2 px-6 h-10 rounded-full border border-shorttiee-primary/30">
                    <Text>{item.name ?? ''}</Text>
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
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View className="flex-1">
              <FlashList
                data={listingQuery.data?.data || []}
                renderItem={item => <ShortletCard data={item} />}
                keyExtractor={item => item.id}
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
