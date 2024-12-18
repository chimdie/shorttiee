import {View, Text, Platform, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';
import {Control, Controller, FieldError, FieldValues} from 'react-hook-form';
import {Feather} from '@expo/vector-icons';
import {getColor} from '@/config/theme';
import tw from 'twrnc';

export type GenderT = {
  key: string;
  label: string;
};

const genderData: GenderT[] = [
  {key: 'male', label: 'Male'},
  {key: 'female', label: 'Female'},
];

type GenderSelectT<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldError | undefined;
  selectedGender: GenderT | undefined;
  setSelectedGender: React.Dispatch<React.SetStateAction<GenderT | undefined>>;
};

export const GenderSelector = <T extends FieldValues>({
  control,
  errors,
  selectedGender,
  setSelectedGender,
}: GenderSelectT<T>) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (gender: GenderT) => {
    setSelectedGender(gender);
    setModalVisible(false);
  };

  return (
    <Controller
      control={control}
      name="gender"
      render={({field}) => (
        <View style={tw`w-full gap-1`}>
          <Pressable
            style={tw`flex px-4 flex flex-row rounded-xl bg-gray-100 items-center  border border-gray-300 w-full ${Platform.select(
              {
                android: 'py-2',
                ios: 'py-4',
                default: '',
              },
            )}`}
            onPress={() => setModalVisible(true)}>
            <Feather
              name="user-check"
              size={24}
              color={getColor('shorttiee-grey-300')}
            />
            <Text
              style={tw`text-sm pl-2 flex-1 ${selectedGender ? 'text-black' : 'text-gray-400'}`}>
              {selectedGender ? selectedGender.label : 'Select gender'}
            </Text>
            <View>
              <Feather
                name="chevron-down"
                size={24}
                color={getColor('shorttiee-grey-300')}
              />
            </View>
          </Pressable>
          {errors && (
            <Text style={tw`text-xs text-red-400 font-normal`}>
              Select your gender
            </Text>
          )}

          <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <Pressable
              style={tw`flex-1 justify-center items-center bg-[#00000080]`}
              onPress={() => setModalVisible(false)}>
              <View style={tw`w-4/5 bg-white rounded-lg p-4 items-center`}>
                {genderData.map(gender => (
                  <Pressable
                    key={gender.key}
                    onPress={() => {
                      field.onChange(gender.key);
                      handleSelect(gender);
                    }}
                    style={tw`py-3 w-full items-center`}>
                    <View className="flex-row items-center gap-1">
                      <Text style={tw`text-black text-base flex-1`}>
                        {gender.label}
                      </Text>
                      {gender.key === selectedGender?.key && (
                        <Feather name="check" size={18} />
                      )}
                    </View>
                  </Pressable>
                ))}
              </View>
            </Pressable>
          </Modal>
        </View>
      )}
    />
  );
};
