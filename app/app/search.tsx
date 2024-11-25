import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 px-4">
      <View>
        <Text>Search page</Text>
      </View>
    </SafeAreaView>
  );
}
