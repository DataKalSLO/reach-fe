import { Box } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import React, { useRef, useState } from 'react';
import IconButton from '../common/components/IconButton';
import OutlinedInput from '../common/components/OutlinedInput';

interface SearchBarProps {
  searchCallback: (qry: string) => void;
  searchBarPlaceholder: string;
  onEmptySearchBar: () => void;
}

function SearchBar(props: SearchBarProps) {
  const [text, setText] = useState('');
  const coreInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.searchCallback(text);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value == '') {
      props.onEmptySearchBar();
    }
    setText(e.target.value);
  };

  const handleClear = () => {
    if (coreInputRef && coreInputRef.current) {
      coreInputRef.current.value = '';
    }
    props.onEmptySearchBar();
  };

  const searchBarButtons = (
    <Box display="flex">
      <IconButton
        onClick={handleClear}
        aria-label="View published stories"
        icon={<Clear />}
      />
      <IconButton
        onClick={() => props.searchCallback(text)}
        icon={<SearchIcon />}
        aria-label="Search graphs, stories"
        size="small"
      />
    </Box>
  );

  return (
    <Box>
      <OutlinedInput
        aria-label={props.searchBarPlaceholder}
        placeholder={props.searchBarPlaceholder}
        onChange={e => handleChange(e)}
        onKeyPress={handleKeyPress}
        width={500}
        button={searchBarButtons}
        inputRef={coreInputRef}
      />
    </Box>
  );
}

export default SearchBar;
