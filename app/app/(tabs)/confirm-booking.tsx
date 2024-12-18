import React from 'react';
import {View, Text, ScrollView, SafeAreaView, Pressable} from 'react-native';
import {Header} from '@rneui/themed';
import {router} from 'expo-router';
import {Feather} from '@expo/vector-icons';
import {ShorttieeButton} from '@/components/Button';
import {ShortletCard} from '@/components/Cards/ShortletCard';

export default function ConfirmBooking() {
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
            <Pressable onPress={() => router.back()}>
              <Feather name="chevron-left" size={32} color="black" />
            </Pressable>
          </View>
        }
      />
      <SafeAreaView className="flex-1 py-6">
        <ScrollView className="flex-1">
          <View className="flex-1 gap-6 px-4">
            <ShortletCard />

            <View className="p-4 border border-gray-100 rounded-xl gap-4 bg-white">
              <View className="flex-row justify-between mb-3">
                <Text>Check in</Text>
                <Text>Dec 10, 2024</Text>
              </View>
              <View className="flex-row justify-between mb-3">
                <Text>Check out</Text>
                <Text>Dec 11, 2024</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Nights</Text>
                <Text>1</Text>
              </View>
            </View>

            <View className="p-4 border border-gray-100 rounded-xl gap-4 bg-white">
              <View className="flex-row justify-between mb-3">
                <Text>1 Night</Text>
                <Text>₦126,000</Text>
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
                <Text className="text-lg font-semibold">₦187,000</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View className="p-4">
          <ShorttieeButton
            title="Continue"
            onPress={() => router.navigate('/(tabs)')}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
