import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Dna } from 'react-loader-spinner';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import { KEY } from './service/api';

export default function App() {
  const [imgName, setImgName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [largeImageObj, setLargeImageObj] = useState(null);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleFormSubmit = imgName => {
    setImgName(imgName);
    setPage(1);
    setImages([]);
    setIsButtonActive(false);
  };

  const clearLargeImageUrl = () => {
    setLargeImageObj(null);
  };

  const handlePageIncrement = () => {
    setPage(state => state + 1);
  };

  useEffect(() => {
    if (imgName === '') {
      return;
    }
    const url = `/?q=${imgName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    setIsLoading(true);
    response();

    async function response() {
      await axios
        .get(url)
        .then(res => {
          res.data.hits.length > 0
            ? setIsButtonActive(true)
            : setIsButtonActive(false);
          setImages(state => [...state, ...res.data.hits]);
          setStatus('resolved');
          setIsLoading(false);

          if (res.data.totalHits === 0) {
            toast.error(
              'There are no images with such name! Please, tray again.'
            );
          }
        })
        .catch(error => {
          setStatus('rejected');
          setError(error);
        });
    }
  }, [imgName, page]);

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'rejected' && (
        <p>Ooops! Something went wrong! Please, try again</p>
      )}

      {status === 'resolved' && (
        <ImageGallery images={images} openModal={setLargeImageObj} />
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
      {isButtonActive === true && <Button btnClick={handlePageIncrement} />}
      <ToastContainer autoClose={3000} theme="colored" />
      {largeImageObj && (
        <Modal imageObj={largeImageObj} closeModal={clearLargeImageUrl} />
      )}
    </div>
  );
}
