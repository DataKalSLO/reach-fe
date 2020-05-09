import React from 'react';
import {
  Box,
  styled,
  TextField,
  makeStyles,
  FormLabel,
  FormGroup,
  MenuItem,
  Select,
} from '@material-ui/core';
import { SliderPicker } from 'react-color';
import { Button } from '../../common/components/Button';
import { uuid } from 'uuidv4';

function AddColumns() {
  const classes = useStyles();
  const TITLE_CHAR_LIMIT = 100;

  const [type, setType] = React.useState('');
  const [state, setState] = React.useState('');

  const getListItem = (label: string) => {
    return (
      <Select
        labelId="select-filled-label"
        id="select-filled"
        value={type}
        onChange={handleChange}
        label="List of Columns"
      >
        <MenuItem value="List of Columns">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>C1</MenuItem>
        <MenuItem value={2}>C2</MenuItem>
        <MenuItem value={3}>C3</MenuItem>
        <MenuItem value={4}>C4</MenuItem>
      </Select>
    );
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  return (
    <form className={classes.root}>
      <FormLabel>First Column</FormLabel>
      <StyledFormGroup row={true}>
        {getListItem('List of Columns')}
      </StyledFormGroup>

      <FormLabel>Second Column</FormLabel>
      <StyledFormGroup row={true}>
        {getListItem('List of Columns')}
      </StyledFormGroup>
    </form>
  );
}

export default AddColumns;

const StyledBox = styled(Box)({
  margin: '10px 10px 10px 0px',
  border: '1px solid red'
});

const StyledTextField = styled(TextField)({
  margin: '0px'
});

const StyledFormGroup = styled(FormGroup)({
  margin: '10px 10px 10px 0px'
});

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '15ch'
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 155
  }
}));
