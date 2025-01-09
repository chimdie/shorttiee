import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker, {DateType} from 'react-native-ui-datepicker';
import {router} from 'expo-router';
import dayjs from 'dayjs';
import {Feather} from '@expo/vector-icons';
import {currencyParser} from '@/utils/currencyParser';
import {ShorttieeButton} from '@/components/Button';
import {getColor} from '@/config/theme';

// TODO:: validate before moving to the complete reservation screen
export default function SelectDate() {
  const [dateRange, setDateRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({
    startDate: undefined,
    endDate: undefined,
  });

  return (
    <View
      className="flex-1 gap-8 py-8 bg-white"
      // style={{ marginHorizontal: 'auto' }}
    >
      <Text className="text-center font-bold text-2xl">Select Date</Text>
      <ScrollView
        contentContainerStyle={{
          marginBottom: 20, // Add space at the bottom
        }}>
        <View className="gap-8 p-4">
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
                <Text className="font-semibold">{currencyParser(+12000)}</Text>
              </Text>
            </View>
          </View>
          <ShorttieeButton
            className="flex-1"
            title="Continue"
            onPress={() => {
              router.canGoBack();
              router.push('/(tabs)/confirm-booking');
            }}
          />
        </View>
        <View className="h-80" />
      </ScrollView>
    </View>
  );
}
