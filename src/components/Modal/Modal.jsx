import PropTypes from 'prop-types';
import { Overlay, ModalBox } from './Modal.styled';
import { useEffect } from 'react';

export default function Modal({ imageObj, closeModal }) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <img src={imageObj.largeImageURL} alt={imageObj.tags} id="modal-img" />
      </ModalBox>
    </Overlay>
  );
}

Modal.propTypes = {
  imageObj: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};
