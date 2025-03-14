import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import {Header} from '@rneui/themed';
import {router, useLocalSearchParams} from 'expo-router';
import {Feather} from '@expo/vector-icons';
import {ShorttieeButton} from '@/components/Button';
// import {ShortletCard} from '@/components/Cards/ShortletCard';
import {APISDK} from '@/sdk';
import {useMutation} from '@tanstack/react-query';
import dayjs from 'dayjs';
import {useAtomValue} from 'jotai';
import {reservationAtom} from '@/atoms/reservation.atom';
import {currencyParser} from '@/utils/currencyParser';
import {apiErrorParser} from '@/utils/errorParser';

export default function ConfirmBooking() {
  const {id} = useLocalSearchParams();
  const reservation = useAtomValue(reservationAtom);
  const formattedStartDate = dayjs(reservation?.startDate).format('YYYY-MM-D');
  const formattedEndDate = dayjs(reservation?.endDate).format('YYYY-MM-D');

  const reservationMutaion = useMutation({
    mutationFn: () =>
      APISDK.ReservationService.createReservation({
        endDate: formattedEndDate,
        listingId: reservation?.listingId as unknown as string,
        startDate: formattedStartDate,
      }),
    onSuccess() {
      Alert.alert('Reservation Info', 'Your reservation has been made', [
        {text: 'OK', onPress: () => router.navigate('/(tabs)')},
      ]);
    },
    onError(error) {
      const parsedError = apiErrorParser(error);
      console.log(parsedError);
      Alert.alert(parsedError.message);
    },
  });

  const onSubmitReserv = () => {
    reservationMutaion.mutate();
  };

  return (
    <View className="bg-white flex-1">
      <Header
        backgroundColor="white"
        containerStyle={{
          borderBottomColor: 'transparent',
          borderWidth: 0,
        }}
        centerComponent={
          <Text className="font-semibold text-2xl">Confirm Booking</Text>
        }
        leftComponent={
          <View>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/apartment-details',
                  params: {id},
                })
              }>
              <Feather name="chevron-left" size={32} color="black" />
            </Pressable>
          </View>
        }
      />
      <SafeAreaView className="flex-1 py-6">
        <ScrollView className="flex-1">
          <View className="flex-1 gap-6 px-4">
            {/* <ShortletCard /> */}
            <View className="p-4 border border-gray-100 rounded-xl gap-4 bg-white">
              <View className="flex-row justify-between mb-3">
                <Text>Check in</Text>
                <Text>
                  {dayjs(reservation?.startDate).format(
                    'ddd, MMM D, YYYY h:mm A',
                  )}
                </Text>
              </View>
              <View className="flex-row justify-between mb-3">
                <Text>Check out</Text>
                <Text>
                  {dayjs(reservation?.endDate).format(
                    'ddd, MMM D, YYYY h:mm A',
                  )}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Nights</Text>
                <Text>{reservation?.totalNights || 0}</Text>
              </View>
            </View>

            <View className="p-4 border border-gray-100 rounded-xl gap-4 bg-white">
              <View className="flex-row justify-between mb-3">
                <Text>1 Night</Text>
                <Text>
                  {reservation?.rate && currencyParser(reservation?.rate)}
                </Text>
              </View>
              <View className="flex-row justify-between mb-3">
                <Text>Addons</Text>
                <Text>₦11,000</Text>
              </View>
              <View className="flex-row justify-between mb-3">
                <Text>Sub Total</Text>
                <Text>₦137,000</Text>
              </View>
              <View className="flex-row justify-between mb-3">
                <View>
                  <Text>Caution Fee</Text>
                  <Text className="text-xs text-green-500">
                    will be refunded after your stay
                  </Text>
                </View>
                <Text>₦50,000</Text>
              </View>
              <View className="flex-row justify-between border-t border-gray-200 pt-4">
                <Text className="text-lg font-semibold">Total</Text>
                <Text className="text-lg font-semibold">
                  {reservation?.totalAmount &&
                    currencyParser(reservation?.totalAmount)}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View className="p-4">
          <ShorttieeButton
            title="Continue"
            onPress={onSubmitReserv}
            loading={reservationMutaion.isPending}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
