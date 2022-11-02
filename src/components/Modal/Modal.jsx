import PropTypes from 'prop-types';
import { Overlay, ModalBox } from './Modal.styled';
import { useEffect } from 'react';

export default function Modal({ image, closeModal }) {
  useEffect(() => {
    let escapeDown = () => {};
    window.addEventListener(
      'keydown',
      (escapeDown = event => {
        if (event.code === 'Escape') {
          closeModal();
        }
      })
    );
    return () => {
      window.removeEventListener('keydown', escapeDown);

      return null;
    };
  }, []);

  const modalClose = event => {
    const img = document.querySelector('#modal-img');
    if (event.target !== img) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={modalClose}>
      <ModalBox>
        <img src={image} alt="" id="modal-img" />
      </ModalBox>
    </Overlay>
  );
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
