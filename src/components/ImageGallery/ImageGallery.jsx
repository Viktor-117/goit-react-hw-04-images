import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.syled';

export default function ImageGallery({ images, openModal }) {
  return (
    <div>
      <ImageGalleryList>
        {images.map(item => (
          <ImageGalleryItem image={item} key={item.id} openModal={openModal} />
        ))}
      </ImageGalleryList>
    </div>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  openModal: PropTypes.func.isRequired,
};
