import {View, Text, SafeAreaView, Pressable} from 'react-native';
import {Header} from '@rneui/themed';
import tw from 'twrnc';
import {Feather} from '@expo/vector-icons';
import {router} from 'expo-router';
import {FlashList} from '@shopify/flash-list';
import {ShortletCard} from '@/components/Cards/ShortletCard';

const shortlets = Array(10).fill({});

export default function Favourites() {
  return (
    <View className="flex-1 bg-white">
      <Header
        backgroundColor="white"
        containerStyle={{borderBottomColor: 'transparent', borderWidth: 0}}
        placement="left">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()}>
            <Feather name="chevron-left" size={32} color="black" />
          </Pressable>
          <Text className="text-xl">Favourites</Text>
        </View>
      </Header>

      <SafeAreaView className="flex-1">
        <View style={[tw`flex-1 px-4`]}>
          <FlashList
            data={shortlets}
            renderItem={() => <ShortletCard />}
            keyExtractor={(_, index) => index.toString()}
            estimatedItemSize={30}
            contentContainerStyle={{paddingBottom: 10}}
            onEndReachedThreshold={0.5}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
