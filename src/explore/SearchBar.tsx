import React, { useState } from 'react';
import { InputBase, IconButton, Box, styled, Paper } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const SearchBarBox = styled(Box)({
  paddingTop: '20px'
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 600
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    }
  })
);

export type SearchBarProps = {
  searchCb: (qry: string) => void;
  landingCb: () => void;
};

function SearchBar(props: SearchBarProps) {
  const [text, setText] = useState('');
  const classes = useStyles();

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
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search graphs, stories"
          onChange={e => handleChange(e)}
          onKeyPress={handleKeyPress}
        />
        <IconButton
          className={classes.iconButton}
          onClick={() => props.searchCb(text)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </SearchBarBox>
  );
}

export default SearchBar;
