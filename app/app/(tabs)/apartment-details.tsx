import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Share,
  ImageBackground,
  Modal,
  Pressable,
  useWindowDimensions,
  Platform,
} from 'react-native';
import {Feather, Ionicons} from '@expo/vector-icons';
import tw from 'twrnc';
import {router} from 'expo-router';
import {Heart, I3DRotate} from 'iconsax-react-native';
import {getColor} from '@/config/theme';
import {ShorttieeButton} from '@/components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlashList} from '@shopify/flash-list';
import {useState} from 'react';
import {BottomSheet} from '@rneui/themed';
import DateTimePicker, {DateType} from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import {currencyParser} from '@/utils/currencyParser';

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
  const [isVisible, setIsVisible] = useState(false);
  const {height} = useWindowDimensions();
  const [dateRange, setDateRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({
    startDate: undefined,
    endDate: undefined,
  });

  const handlerShowSheet = () => {
    setModalVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  };

  return (
    <SafeAreaView className="flex-1 justify-betweenn bg-white">
      <ScrollView className="flex-1 gap-8">
        <ImageBackground
          source={require('../../assets/images/parlour.jpg')}
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
                <Text className="text-shorttiee-primary">2.13 miles away</Text>
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
            <Text className="text-lg font-semibold text-gray-800">Details</Text>
            <View className="flex-row justify-between gap-4">
              <DetailsCard icon="bed-outline" title="Apartment" />
              <DetailsCard icon="briefcase-outline" title="Bedrooms" />
              <DetailsCard icon="water-outline" title="Bathroom" />
            </View>
          </View>
          <View className="gap-2">
            <Text className="text-lg font-semibold text-gray-800">
              Description
            </Text>
            <Text className="text-sm">
              A fully furnished house that promises a perfect home away from
              home experience.
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
          <Text className="text-lg font-bold text-shorttiee-primary">₦96K</Text>
          <Text className="text-gray-500">/night</Text>
        </View>

        <View className="flex-1">
          <ShorttieeButton
            title="Book Now"
            // onPress={() => setModalVisible(true)} // TODO PUT BACK
            onPress={() => setIsVisible(true)}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={tw`flex-1 justify-center items-center bg-[#00000080]`}
          onPress={() => setModalVisible(false)}>
          <Pressable
            onPress={() => {}}
            className="w-4/5 bg-white rounded-xl p-6 justify-between gap-8">
            <Text className="text-center text-2xl font-semibold">
              Disclaimer
            </Text>
            <Text className="text-center px-2">
              All apartment bookings and transactions should only be done on
              Shorttiee app. Do not make bookings outside of the app as we are
              totally not responsible for such activities.
            </Text>
            <ShorttieeButton
              title="Continue"
              onPress={() => handlerShowSheet()}
            />
          </Pressable>
        </Pressable>
      </Modal>

      <BottomSheet
        modalProps={{presentationStyle: 'overFullScreen'}}
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}>
        <View
          style={[
            tw`flex-1 bg-white rounded-l-xl rounded-r-xl px-4 py-6 gap-6`,
            {
              height: Platform.select({
                android: height - 150,
                ios: height - 200,
              }),
            },
          ]}>
          <ScrollView className="flex-1">
            <View className="gap-8">
              <Text className="text-center font-bold text-xl">Select Date</Text>
              <DateTimePicker
                mode="range"
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onChange={event => setDateRange(event)}
                minDate={dayjs()}
                selectedTextStyle={{
                  fontWeight: 'bold',
                }}
                selectedItemColor={getColor('shorttiee-primary')}
                todayContainerStyle={{
                  borderColor: getColor('shorttiee-primary'),
                  borderWidth: 1,
                }}
                headerTextStyle={{
                  fontWeight: 500,
                }}
              />
              <View className="gap-4">
                <View className="gap-1 flex-1">
                  <Text className="font-medium">Check in</Text>
                  <Pressable className="flex-row items-center gap-2 p-3 rounded-lg bg-gray-100">
                    <Text className="flex-1">
                      {dateRange.startDate?.toLocaleString()}
                    </Text>
                    <Feather name="calendar" size={20} />
                  </Pressable>
                </View>
                <View className="gap-1 flex-1">
                  <Text className="font-medium">Check out</Text>
                  <Pressable className="flex-row items-center gap-2 p-3 rounded-lg bg-gray-100">
                    <Text className="flex-1">
                      {dateRange.endDate?.toLocaleString()}
                    </Text>
                    <Feather name="calendar" size={20} />
                  </Pressable>
                </View>
              </View>
              <View className="gap-2">
                <Text className="font-medium">Duration Breakdown</Text>
                <View className="border border-gray-200 p-3 items-center justify-center flex-row gap-2 rounded-lg">
                  <Text className="text-xl font-semibold">
                    {currencyParser(+12000)}
                  </Text>
                  <Text className="text-shorttiee-secondary text-lg font-medium px-2">
                    x
                  </Text>
                  <Text className="text-xl font-semibold">1 Nights</Text>
                </View>
                <View className="items-center py-4 gap-2">
                  <Text className="text-gray-500 text-lg">
                    Sub Total:{' '}
                    <Text className="font-semibold text-black">
                      {currencyParser(+12000)}
                    </Text>
                  </Text>
                  <View>
                    <Text className="text-gray-500 text-lg">
                      Caution Fee:
                      <Text className="font-semibold text-black">
                        {currencyParser(+2000)}
                      </Text>
                    </Text>
                    <Text className="text-green-600 text-sm">
                      will be refunded after your stay
                    </Text>
                  </View>
                  <Text className="text-black text-lg font-bold">
                    Total:{' '}
                    <Text className="font-semibold">
                      {currencyParser(+12000)}
                    </Text>
                  </Text>
                </View>
              </View>
              <ShorttieeButton
                title="Continue"
                onPress={() => {
                  if (isVisible) {
                    router.navigate('/(tabs)/confirm-booking');
                    setIsVisible(false);
                  }
                }}
              />
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    </SafeAreaView>
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
