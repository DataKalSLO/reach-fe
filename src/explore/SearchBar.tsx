import React, { useState } from 'react';
import { InputBase, IconButton, Box, styled } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchBarBox = styled(Box)({
  paddingTop: '10px'
});

export type SearchBarProps = {
  searchCb: (qry: string) => void;
  landingCb: () => void;
};

function SearchBar(props: SearchBarProps) {
  const [text, setText] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.searchCb(text);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setText(e.target.value);
    if (e.target.value === '') {
      props.landingCb();
    }
  };

  return (
    <SearchBarBox>
      <InputBase
        placeholder="Search graphs, stories"
        onChange={e => handleChange(e)}
        onKeyPress={handleKeyPress}
      />
      <IconButton onClick={() => props.searchCb(text)}>
        <SearchIcon />
      </IconButton>
    </SearchBarBox>
  );
}

export default SearchBar;
