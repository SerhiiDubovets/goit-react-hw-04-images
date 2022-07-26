import { useEffect, useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import LoadMore from '../Button';
import Loader from '../Loader';
import Modal from '../Modal';
import { Gallery } from './ImageGallery.styled';
import { getGallery } from '../Services/Api.js';
import NotFound from '../NotFound';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default function ImageGallery({ onLoadMore, page, galleryName }) {
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState('idle');
  const [resolve, setResolve] = useState(null);
  const [errors, setErrors] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    setGallery([]);
  }, [galleryName]);

  useEffect(() => {
    if (galleryName === '') {
      return;
    }

    async function hendleFetch() {
      try {
        setIsLoader(true);
        const resolve = await getGallery(galleryName, page);
        setIsLoader(false);
        setStatus('resolved');

        setGallery(prevGallery => [...prevGallery, ...resolve.data.hits]);

        setResolve(resolve.data.hits.length);
        if (resolve.data.hits.length === 0) {
          toast.error('Что-то пoшло не так :( ');
          return;
        }
      } catch (error) {
        setStatus('rejected');
        setErrors(error.message);
        console.log(error.message);
      }
    }
    hendleFetch();
  }, [galleryName, page]);

  const handleModalImg = (img, imgAlt) => {
    setModalImg(img);
    setModalAlt(imgAlt);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {resolve === 0 && <NotFound galleryName={galleryName} />}
      {status === 'idle' && <div>Начните поиск!</div>}
      <Gallery>
        {gallery.map(image => (
          <ImageGalleryItem
            key={image.id}
            webformatURL={image.webformatURL}
            modalOpen={toggleModal}
            handleModalImg={handleModalImg}
            largeImg={image.largeImageURL}
            imgAlt={image.tags}
          />
        ))}
        {showModal && (
          <Modal
            modalAlt={modalAlt}
            modalImg={modalImg}
            closeModal={toggleModal}
          />
        )}
      </Gallery>
      {isLoader && <Loader />}
      {resolve >= 12 && <LoadMore Click={onLoadMore} />}
      {status === 'rejected' && <h2>{errors}</h2>}
    </>
  );
}

ImageGallery.propTypes = {
  galleryName: PropTypes.string.isRequired,
};
