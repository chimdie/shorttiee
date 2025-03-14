import {
  View,
  Text,
  Platform,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useMemo} from 'react';
import {getColor} from '@/config/theme';
import {currencyParser} from '@/utils/currencyParser';
import {Feather} from '@expo/vector-icons';
import {BottomSheet} from '@rneui/base';
import DateTimePicker, {DateType} from 'react-native-ui-datepicker';
import {ShorttieeButton} from './Button';
import tw from 'twrnc';
import {reservationAtom} from '@/atoms/reservation.atom';
import {useAtom} from 'jotai';
import dayjs from 'dayjs';
import {router} from 'expo-router';

type ReservationSheetProps = {
  bottomsheetView: boolean;
  listingId: string;
  rate: number;
  setBottomsheetView: React.Dispatch<React.SetStateAction<boolean>>;
  dateRange: {
    startDate: DateType;
    endDate: DateType;
  };
  setDateRange: React.Dispatch<
    React.SetStateAction<{
      startDate: DateType;
      endDate: DateType;
    }>
  >;
  closeReservationModal: () => void;
};

// TODO: remove RESET BUTTON

export function ReservationSheet(props: ReservationSheetProps) {
  const {height} = useWindowDimensions();
  const [reservation, setReservation] = useAtom(reservationAtom);

  const {dateRange, setDateRange} = props;

  const totalNights = useMemo(() => {
    if (!dateRange.startDate || !dateRange.endDate) return 0;

    const start = dayjs(dateRange.startDate);
    const end = dayjs(dateRange.endDate);

    const nights = end.diff(start, 'day');
    return Math.max(nights, 1);
  }, [dateRange]);

  const handleConfirmReservation = () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      alert('Please select a valid date range.');
      return;
    }

    const newReservation = {
      startDate: String(dateRange.startDate),
      endDate: String(dateRange.endDate),
      listingId: props.listingId as string,
      rate: props.rate || 0,
      totalAmount,
      totalNights,
    };

    setReservation(newReservation);

    router.push({
      pathname: '/(tabs)/confirm-booking',
      params: {id: props.listingId},
    });
    props.setBottomsheetView(false);
  };

  const totalAmount = totalNights * (props.rate ?? 0);
  const isSummaryComplete =
    !dateRange.startDate || !dateRange.endDate || !reservation?.listingId;

  return (
    <BottomSheet
      modalProps={{presentationStyle: 'overFullScreen'}}
      isVisible={props.bottomsheetView}
      onBackdropPress={props.closeReservationModal}>
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
              onChange={event => {
                setDateRange(event);
                setReservation(prev => ({
                  ...prev,
                  startDate: String(event.startDate),
                  endDate: String(event.endDate),
                  listingId: props.listingId as string,
                  rate: props.rate || 0,
                  totalAmount,
                  totalNights,
                }));
              }}
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
            <View style={tw`flex flex-row justify-end w-full`}>
              <Pressable
                hitSlop={20}
                onPress={() =>
                  props.setDateRange({
                    startDate: undefined,
                    endDate: undefined,
                  })
                }
                className="px-4">
                <Text>Reset</Text>
              </Pressable>
            </View>
            <View className="gap-4">
              <View className="gap-1 flex-1">
                <Text className="font-medium">Check in</Text>
                <Pressable className="flex-row items-center gap-2 p-3 rounded-lg bg-gray-100">
                  <Text className="flex-1">
                    {dateRange.startDate
                      ? dayjs(dateRange.startDate).format(
                          'ddd, MMM D, YYYY h:mm A',
                        )
                      : dateRange.startDate?.toString()}
                  </Text>
                  <Feather name="calendar" size={20} />
                </Pressable>
              </View>
              <View className="gap-1 flex-1">
                <Text className="font-medium">Check out</Text>
                <Pressable className="flex-row items-center gap-2 p-3 rounded-lg bg-gray-100">
                  <Text className="flex-1">
                    {dateRange.endDate
                      ? dayjs(dateRange.endDate).format(
                          'ddd, MMM D, YYYY h:mm A',
                        )
                      : dateRange.endDate?.toString()}
                  </Text>
                  <Feather name="calendar" size={20} />
                </Pressable>
              </View>
            </View>
            <View className="gap-2">
              <Text className="font-medium">Duration Breakdown</Text>
              <View className="border border-gray-200 p-3 items-center justify-center flex-row gap-2 rounded-lg">
                <Text className="text-xl font-semibold">
                  {props.rate && currencyParser(props.rate)}
                </Text>
                <Text className="text-shorttiee-secondary text-lg font-medium px-2">
                  x
                </Text>
                <Text className="text-xl font-semibold">
                  {totalNights} Nights
                </Text>
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
                    {totalAmount && currencyParser(+totalAmount)}
                  </Text>
                </Text>
              </View>
            </View>
            <ShorttieeButton
              title="Continue"
              disabled={isSummaryComplete}
              onPress={handleConfirmReservation}
            />
          </View>
        </ScrollView>
      </View>
    </BottomSheet>
  );
}
