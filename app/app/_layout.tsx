import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import {HomeHashtag} from 'iconsax-react-native';
import '../global.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ActivityIndicator, Platform, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {APISDK} from '@/sdk';
import {StoredKeys} from '@/constants/storedKeys';
import * as SecureStore from 'expo-secure-store';
import {serializeString} from '@/utils/globalFns';

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await SecureStore.getItemAsync(
          StoredKeys.token,
        );

        if (Platform.OS !== 'web') {
          if (savedStateString !== undefined) {
            const serializedToken = serializeString(
              savedStateString as unknown as string,
            );

            APISDK.OpenAPI.TOKEN = serializedToken;
            setAuthToken(serializedToken);
          }
        }
      } finally {
        setIsAppReady(true);
      }
    };

    if (!isAppReady) {
      restoreState();
    }
  }, [isAppReady]);

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
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack
          initialRouteName={authToken ? '(tabs)' : '(auth)'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="(auth)" redirect={!!authToken} />
          <Stack.Screen
            name="(tabs)"
            options={{
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
                  animation: 'slide_from_bottom',
                }}
              />
            ),
            ios: (
              <Stack.Screen
                name="search"
                options={{
                  presentation: 'modal',
                }}
              />
            ),
            default: (
              <Stack.Screen
                name="search"
                options={{
                  animation: 'slide_from_bottom',
                }}
              />
            ),
          })}

          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
