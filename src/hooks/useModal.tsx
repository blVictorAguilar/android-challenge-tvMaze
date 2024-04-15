import React, {useState} from 'react';
import BaseModal from '../components/Modal';

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content: any) => {
    setModalContent(content);
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const ModalWrapper = () => (
    <BaseModal isVisible={isVisible} closeModalFn={closeModal}>
      {modalContent}
    </BaseModal>
  );

  return {openModal, closeModal, ModalWrapper};
};

export default useModal;
