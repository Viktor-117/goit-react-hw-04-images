import PropTypes from 'prop-types';
import { ImageItem, ItemImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ image, openModal }) {
  const { webformatURL, largeImageURL, tags } = image;
  const handleImgClick = () => {
    openModal(largeImageURL);
  };

  return (
    <div>
      <ImageItem onClick={handleImgClick}>
        <ItemImage src={webformatURL} alt={tags} />
      </ImageItem>
    </div>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    image: PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};
