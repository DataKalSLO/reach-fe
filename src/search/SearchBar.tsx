import React, { useState } from 'react';
import { InputBase, IconButton, Box, styled, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const SearchBarBox = styled(Box)({
  paddingTop: '20px'
});

const StyledIconButton = styled(IconButton)({
  padding: 10
});

const StyledInput = styled(InputBase)({
  spacing: 1,
  flex: 1
});

const StyledPaper = styled(Paper)({
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  width: 600
});

export type SearchBarProps = {
  searchCb: (qry: string) => void;
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
  };

  return (
    <SearchBarBox>
      <StyledPaper component="form">
        <StyledInput
          placeholder="Search graphs, stories"
          onChange={e => handleChange(e)}
          onKeyPress={handleKeyPress}
        />
        <StyledIconButton onClick={() => props.searchCb(text)}>
          <SearchIcon />
        </StyledIconButton>
      </StyledPaper>
    </SearchBarBox>
  );
}

export default SearchBar;
