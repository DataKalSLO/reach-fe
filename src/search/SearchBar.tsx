import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import IconButton from '../common/components/IconButton';
import OutlinedInput from '../common/components/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';

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
    <Box>
      <OutlinedInput
        aria-label="Search graphs, stories"
        placeholder="Search graphs, stories"
        onChange={e => handleChange(e)}
        onKeyPress={handleKeyPress}
        button={
          <IconButton
            onClick={() => props.searchCallback(text)}
            icon={<SearchIcon />}
            aria-label="Search graphs, stories"
            size="small"
          />
        }
        width={500}
      />
    </Box>
  );
}

export default SearchBar;
