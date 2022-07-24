import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function App() {
  const [galleryName, setGalleryName] = useState('');
  const [page, setPage] = useState(1);

  const handleSearchGallery = galleryName => {
    setGalleryName(galleryName);
    setPage(1);
  };

  const loadMore = e => {
    e.preventDefault();
    setPage(prevState => prevState + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchGallery} />
      <ImageGallery
        galleryName={galleryName}
        onLoadMore={loadMore}
        page={page}
      />
      <ToastContainer autoClose={3000} />
    </div>
  );
}
