import { Component } from 'react';
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

export default class Searchbar extends Component {
  state = { value: '' };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.value.trim() === '') {
      toast.error('Please, input image name');
      return;
    }
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <SearchBox>
        <SearchForm onSubmit={this.handleSubmit}>
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
            value={this.state.value}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchBox>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
