import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Dna } from 'react-loader-spinner';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import { KEY } from './service/api';

export default class App extends Component {
  state = {
    imgName: '',
    images: [],
    page: 1,
    status: 'idle',
    isLoading: false,
    error: null,
    largeImage: null,
    isButtonActive: false,
  };

  handleFormSubmit = imgName => {
    this.setState({ imgName: imgName, page: 1, images: [] });
  };

  setLargeImageUrl = img => {
    this.setState({ largeImage: img });
  };

  clearLargeImageUrl = () => {
    this.setState({ largeImage: null });
  };

  toggleModal = img => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
    console.log(img);

    this.setState({ largeImage: img });
  };

  handlePageIncrement = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.imgName !== this.state.imgName ||
      prevState.page !== this.state.page
    ) {
      const { imgName, page } = this.state;
      const url = `/?q=${imgName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
      this.setState({ isLoading: true });
      const response = await axios.get(url).catch(error => {
        this.setState({ status: 'rejected' });
      });
      response.data.hits.length > 0
        ? this.setState({ isButtonActive: true })
        : this.setState({ isButtonActive: false });
      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        status: 'resolved',
        isLoading: false,
      }));
    }
  }

  render() {
    const { images, status, isLoading, largeImage, isButtonActive } =
      this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'rejected' && (
          <p>Ooops! Something went wrong! Please, try again</p>
        )}

        {status === 'resolved' && (
          <ImageGallery images={images} openModal={this.setLargeImageUrl} />
        )}
        {isLoading === true && (
          <div style={{ textAlign: 'center' }}>
            <Dna
              justifyContent="center"
              visible={true}
              height="100"
              width="100"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
        {isButtonActive === true && (
          <Button btnClick={this.handlePageIncrement} />
        )}
        <ToastContainer autoClose={3000} theme="colored" />
        {largeImage && (
          <Modal image={largeImage} closeModal={this.clearLargeImageUrl} />
        )}
      </div>
    );
  }
}
