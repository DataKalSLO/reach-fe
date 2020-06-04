import { Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import IconButton from '../common/components/IconButton';
import OutlinedInput from '../common/components/OutlinedInput';

interface SearchBarProps {
  searchCallback: (qry: string) => void;
  searchBarPlaceholder: string;
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
    <Box>
      <OutlinedInput
        aria-label={props.searchBarPlaceholder}
        placeholder={props.searchBarPlaceholder}
        onChange={e => handleChange(e)}
        onKeyPress={handleKeyPress}
        width={500}
        button={
          <IconButton
            onClick={() => props.searchCallback(text)}
            icon={<SearchIcon />}
            aria-label="Search graphs, stories"
            size="small"
          />
        }
      />
    </Box>
  );
}

export default SearchBar;
