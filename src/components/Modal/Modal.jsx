import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalBlock, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, modalImg, modalAlt }) {
  useEffect(() => {
    const hendleModal = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', hendleModal);
    return () => {
      window.removeEventListener('keydown', hendleModal);
    };
  }, [closeModal]);

  const handleBackdrop = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdrop}>
      <ModalBlock>
        <img src={modalImg} alt={modalAlt} />
      </ModalBlock>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  modalAlt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
