import {Modal} from 'react-native';
import React from 'react';

type ModalProps = {
  isVisible: boolean;
  closeModalFn: () => void;
  children: React.ReactElement | null;
};
export default function BaseModal({
  isVisible,
  closeModalFn,
  children,
}: ModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      statusBarTranslucent
      onRequestClose={closeModalFn}>
      {children}
    </Modal>
  );
}
