import {
  View,
  useWindowDimensions,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import {Header, HeaderProps} from '@rneui/themed';
import Constants from 'expo-constants';
import {PropsWithChildren} from 'react';
import {Feather} from '@expo/vector-icons';
import {router} from 'expo-router';

type AuthScreenLayoutT = {
  headerProps?: HeaderProps;
  title?: string;
  hasBackbutton?: boolean;
} & PropsWithChildren;

export function AuthScreenLayout(props: AuthScreenLayoutT) {
  const windowHeight = useWindowDimensions().height;
  return (
    <View className="flex-1 bg-white">
      <Header
        backgroundColor="white"
        {...props.headerProps}
        centerComponent={
          <Text className="font-semibold text-2xl">{props.title}</Text>
        }
        leftComponent={
          <>
            {props.hasBackbutton ? (
              <Pressable onPress={() => router.back()}>
                <Feather name="chevron-left" size={32} color="black" />
              </Pressable>
            ) : null}
          </>
        }
      />
      <SafeAreaView
        className="bg-pax-white flex-1"
        style={[{minHeight: Math.round(windowHeight)}]}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView className="flex-1">
            <View
              className="flex-1 items-center gap-8 px-6"
              style={{marginVertical: Constants.statusBarHeight}}>
              {props.children}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
}
