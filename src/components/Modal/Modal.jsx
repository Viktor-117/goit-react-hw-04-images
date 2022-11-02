import PropTypes from 'prop-types';
import { Overlay, ModalBox } from './Modal.styled';
import { Component } from 'react';

export default class Modal extends Component {
  escapeDown = () => {};
  componentDidMount() {
    window.addEventListener(
      'keydown',
      (this.escapeDown = event => {
        if (event.code === 'Escape') {
          this.props.closeModal();
        }
      })
    );
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.escapeDown);
  }

  modalClose = event => {
    const img = document.querySelector('#modal-img');
    if (event.target !== img) {
      this.props.closeModal();
    }
  };
  render() {
    return (
      <Overlay onClick={this.modalClose}>
        <ModalBox>
          <img src={this.props.image} alt="" id="modal-img" />
        </ModalBox>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
