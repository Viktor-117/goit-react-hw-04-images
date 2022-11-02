import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchBox,
  SubmitBtn,
  SearchForm,
  FormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (value.trim() === '') {
      toast.error('Please, input image name');
      return;
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <SearchBox>
      <SearchForm onSubmit={handleSubmit}>
        <SubmitBtn>
          <IconContext.Provider value={{ size: '1.5em' }}>
            <div>
              <BsSearch />
            </div>
          </IconContext.Provider>
        </SubmitBtn>

        <FormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchBox>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
