import {
  View,
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
import tw from 'twrnc';

type AuthScreenLayoutT = {
  headerProps?: HeaderProps;
  title?: string;
  hasBackbutton?: boolean;
} & PropsWithChildren;

export function AuthScreenLayout(props: AuthScreenLayoutT) {
  return (
    <View className="flex-1 bg-white">
      <Header
        {...props.headerProps}
        backgroundColor="white"
        containerStyle={{
          borderBottomColor: 'transparent',
          borderWidth: 0,
        }}
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
      <SafeAreaView className="bg-pax-white flex-1">
        <ScrollView className="flex-1">
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{marginVertical: Constants.statusBarHeight}}>
              <View style={tw`flex-1 items-center gap-8 px-4`}>
                {props.children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
