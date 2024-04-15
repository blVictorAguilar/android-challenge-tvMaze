import {StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal/dist/modal';

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
      isVisible={isVisible}
      onBackdropPress={closeModalFn}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="fadeOutDown"
      style={styles.modal}>
      {children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
  },
});
