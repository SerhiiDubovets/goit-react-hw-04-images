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

// export default class Searchbar extends Component {
//   state = {
//     galleryName: '',
//   };

// handleNameChange = event => {
//   this.setState({ galleryName: event.target.value.toLowerCase() });
// };

// handleSubmit = e => {
//   e.preventDefault();

//   const { galleryName } = this.state;

//   if (galleryName.trim() === '') {
//     toast.error('Введите название поиска');
//     return;
//   }

//   this.props.onSubmit(galleryName);
//   this.setState({ galleryName: '' });
// };

//   render() {
//     const { galleryName } = this.state;

// return (
//   <Header>
//     <SearchForm onSubmit={this.handleSubmit} onChange={this.handleNameChange}>
//       <SearchButton type="submit">
//         <ButtonLabel>Search</ButtonLabel>
//       </SearchButton>

//       <SearchInput
//         onChange={this.handleNameChange}
//         value={galleryName}
//         type="text"
//         autoComplete="off"
//         autoFocus
//         placeholder="Search images and photos"
//       />
//     </SearchForm>
//   </Header>
// );
//   }
// }
