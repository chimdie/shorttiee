import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Share,
  ImageBackground,
} from 'react-native';
import {Feather, Ionicons} from '@expo/vector-icons';
import tw from 'twrnc';
import {router, useLocalSearchParams} from 'expo-router';
import {Heart, I3DRotate} from 'iconsax-react-native';
import {getColor} from '@/config/theme';
import {ShorttieeButton} from '@/components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlashList} from '@shopify/flash-list';
import {useState} from 'react';
import {currencyParser} from '@/utils/currencyParser';
import {useQuery} from '@tanstack/react-query';
import {APISDK} from '@/sdk';
import {QueryKeys} from '@/constants/queryKeys';
import {ReservationSheet} from '@/components/ReservationSheet';
import {ApartmentDetails} from '@/components/ApartmentDetails';
import {DisclaimerModal} from '@/components/DisclaimerModal';
import {DateType} from 'react-native-ui-datepicker';

type Facility = {
  name: string;
  icon: React.ComponentProps<typeof Feather>['name'];
};

const facilities: Facility[] = [
  {name: 'Air Conditioner', icon: 'airplay'},
  {name: 'Power Supply', icon: 'power'},
  {name: 'Wifi', icon: 'wifi'},
  {name: 'Parking Space', icon: 'compass'},
];
// TODO: Reviews list
export default function ApartmentDetailScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomsheetView, setBottomsheetView] = useState(false);
  const [dateRange, setDateRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({
    startDate: undefined,
    endDate: undefined,
  });
  const {id} = useLocalSearchParams();

  const listingInfo = useQuery({
    queryKey: [QueryKeys.listing],
    queryFn: () =>
      APISDK.ListingService.getApiV1Listings1(id as unknown as string),
  });

  const handlerShowSheet = () => {
    setModalVisible(false);
    setTimeout(() => {
      setBottomsheetView(true);
    }, 300);
  };

  const closeReservationModal = () => {
    setBottomsheetView(false);
    setDateRange({
      startDate: undefined,
      endDate: undefined,
    });
  };

  return (
    <SafeAreaView className="flex-1 justify-betweenn bg-white">
      <ScrollView className="flex-1 gap-8">
        <ImageBackground
          source={
            listingInfo.data?.data.images?.[0]
              ? {uri: listingInfo.data?.data.images[0]}
              : require('../../assets/images/parlour.jpg')
          }
          style={tw`w-full h-80`}>
          <View className="p-4 flex-row justify-between w-full">
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
                  Share.share({
                    title: 'Share',
                    message: 'sharing is caring',
                  })
                }>
                <Ionicons name="share-social-outline" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View className="p-4 gap-8 bg-white">
          <View>
            <Text className="text-lg font-semibold text-gray-800">
              {listingInfo.data?.data?.name ?? ''}
            </Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-gray-500">
                {listingInfo.data?.data?.address ?? ''}
              </Text>
              <View className="flex-row">
                <Ionicons
                  name="location-outline"
                  size={16}
                  color={getColor('shorttiee-primary')}
                />
                <Text className="text-shorttiee-primary">2.13 miles away</Text>
              </View>
            </View>
          </View>
          <View className="bg-shorttiee-primary/10 p-4 rounded-lg flex-row items-center gap-2">
            <Ionicons name="person-outline" size={24} color="black" />
            <View className="gap-1">
              <Text className="">
                Hosted by {listingInfo.data?.data?.user?.firstName ?? ''}
              </Text>
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
            <Text className="text-lg font-semibold text-gray-800">Details</Text>
            <View className="flex-row justify-between gap-4">
              <ApartmentDetails icon="bed-outline" title="Apartment" />
              <ApartmentDetails icon="briefcase-outline" title="Bedrooms" />
              <ApartmentDetails icon="water-outline" title="Bathroom" />
            </View>
          </View>
          <View className="gap-2">
            <Text className="text-lg font-semibold text-gray-800">
              Description
            </Text>
            <Text className="text-sm">
              {listingInfo.data?.data.description ?? ''}
            </Text>
          </View>
          <View className="gap-2">
            <Text className="text-lg font-semibold text-gray-800">
              Facilities
            </Text>
            <View className="flex-1">
              <FlashList
                data={facilities}
                estimatedItemSize={36}
                keyExtractor={item => item.name}
                horizontal
                renderItem={({item: {name, icon}}) => (
                  <View className="mx-2 items-center gap-1">
                    <Feather
                      size={30}
                      name={icon}
                      color={getColor('shorttiee-primary')}
                    />
                    <Text className="text-sm">{name}</Text>
                  </View>
                )}
              />
            </View>
          </View>
          <View className="gap-2">
            <Text className="text-lg font-semibold text-gray-800">Reviews</Text>
          </View>
        </View>
      </ScrollView>
      <View className="flex-row justify-between items-center p-4 bg-white border- w-full gap-x-6">
        <View className="flex-row items-center">
          <Text className="text-lg font-bold text-shorttiee-primary">
            {listingInfo.data?.data.rate &&
              currencyParser(listingInfo.data?.data.rate)}
          </Text>
          <Text className="text-gray-500">/night</Text>
        </View>

        <View className="flex-1">
          <ShorttieeButton
            title="Book Now"
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>

      <DisclaimerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handlerShowSheet={handlerShowSheet}
      />
      <ReservationSheet
        bottomsheetView={bottomsheetView}
        listingId={id as string}
        rate={listingInfo.data?.data.rate || 0}
        setBottomsheetView={setBottomsheetView}
        dateRange={dateRange}
        setDateRange={setDateRange}
        closeReservationModal={closeReservationModal}
      />
    </SafeAreaView>
  );
}
