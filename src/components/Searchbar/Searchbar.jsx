import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchButton,
  ButtonLabel,
  SearchInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [galleryName, setGalleryName] = useState('');

  const handleNameChange = event => {
    setGalleryName(event.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (galleryName.trim() === '') {
      toast.error('Введите название поиска');
      return;
    }

    onSubmit(galleryName);
    setGalleryName('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit} onChange={handleNameChange}>
        <SearchButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SearchButton>

        <SearchInput
          onChange={handleNameChange}
          value={galleryName}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
