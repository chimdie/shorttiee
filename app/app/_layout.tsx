import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import {HomeHashtag} from 'iconsax-react-native';
import '../global.css';
import {ActivityIndicator, Platform, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsAppReady(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!loaded || !isAppReady) {
    return (
      <View className="flex-1 justify-center items-center bg-shorttiee-primary">
        <View className="items-center gap-2">
          <View className="aspect-square items-center justify-center">
            <HomeHashtag size={80} variant="Bulk" color="white" />
          </View>
          <Text className="text-center font-extrabold text-2xl text-white">
            Shorttiee
          </Text>
        </View>
        <View className="absolute bottom-60">
          <ActivityIndicator className="text-white" />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            animation: 'slide_from_left',
            animationDuration: 0,
            animationTypeForReplace: 'push',
          }}
        />
        {Platform.select({
          android: (
            <Stack.Screen
              name="search"
              options={{
                headerShown: false,
                animation: 'slide_from_bottom',
              }}
            />
          ),
          ios: (
            <Stack.Screen
              name="search"
              options={{
                headerShown: false,
                presentation: 'modal',
              }}
            />
          ),
          default: (
            <Stack.Screen
              name="search"
              options={{
                headerShown: false,
                animation: 'slide_from_bottom',
              }}
            />
          ),
        })}
        <Stack.Screen
          name="reservation-date"
          options={{
            headerShown: false,
            presentation: 'formSheet',
            gestureDirection: 'vertical',
            animation: 'slide_from_bottom',
            sheetGrabberVisible: false,
            sheetInitialDetentIndex: 0,
            sheetAllowedDetents: [0.5, 0.9],
            sheetElevation: 1,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaProvider>
  );
}
