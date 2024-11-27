import {View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UnControlledTextInput} from '@/components/TextInput';
import {SearchNormal1, Setting4} from 'iconsax-react-native';
import {getColor} from '@/config/theme';
import {FlashList} from '@shopify/flash-list';
import {ShortletCard} from '@/components/Cards/ShortletCard';

const categories = [
  'Apartment',
  'Beach Villa',
  'Studio Apartment',
  'Vacation Home',
  'Rest Resort',
  'Work studio',
];

const shortlets = Array(10).fill({});

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 px-4 py-6 bg-white">
      <View className="flex-1 gap-8">
        <UnControlledTextInput
          placeholder="Enter Location"
          startContent={<SearchNormal1 color={getColor('shorttiee-primary')} />}
          endContent={
            <TouchableOpacity>
              <Setting4 color={getColor('shorttiee-primary')} />
            </TouchableOpacity>
          }
        />
        <View>
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
        <Text className="text-black">Search results(20)</Text>
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
    </SafeAreaView>
  );
}
