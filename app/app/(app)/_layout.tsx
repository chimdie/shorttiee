import {Stack} from 'expo-router';

export default function AppScreensLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="apartment-details" />
      <Stack.Screen name="favourites" />
    </Stack>
  );
}
