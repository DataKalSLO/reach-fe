import React, { useState } from 'react';
import { Box, styled, Paper } from '@material-ui/core';
import IconButton from '../common/components/IconButton';
import SearchInputBase from '../common/components/SearchInputBase';
import SearchIcon from '@material-ui/icons/Search';

const SearchBarBox = styled(Box)({
  paddingTop: '20px'
});

const StyledPaper = styled(Paper)({
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  width: 600
});

interface SearchBarProps {
  searchCallback: (qry: string) => void;
}

function SearchBar(props: SearchBarProps) {
  const [text, setText] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.searchCallback(text);
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
        <SearchInputBase
          placeholder="Search graphs, stories"
          onChange={e => handleChange(e)}
          onKeyPress={handleKeyPress}
        />
        <IconButton
          onClick={() => props.searchCallback(text)}
          icon={<SearchIcon />}
          aria-label="Search graphs, stories"
        />
      </StyledPaper>
    </SearchBarBox>
  );
}

export default SearchBar;
