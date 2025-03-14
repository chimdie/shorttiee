import {Text, Modal, Pressable} from 'react-native';
import React from 'react';
import {ShorttieeButton} from './Button';
import tailwind from 'twrnc';

type DisclaimerModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handlerShowSheet: () => void;
};

export function DisclaimerModal(props: DisclaimerModalProps) {
  const closeModal = () => props.setModalVisible(false);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={props.modalVisible}
      onRequestClose={closeModal}>
      <Pressable
        style={tailwind`flex-1 justify-center items-center bg-[#00000080]`}
        onPress={closeModal}>
        <Pressable
          onPress={() => {}}
          className="w-4/5 bg-white rounded-xl p-6 justify-between gap-8">
          <Text className="text-center text-2xl font-semibold">Disclaimer</Text>
          <Text className="text-center px-2">
            All apartment bookings and transactions should only be done on
            Shorttiee app. Do not make bookings outside of the app as we are
            totally not responsible for such activities.
          </Text>
          <ShorttieeButton title="Continue" onPress={props.handlerShowSheet} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}
