import React from 'react';
import {
  Box,
  styled,
  TextField,
  makeStyles,
  FormGroup,
  MenuItem,
  InputLabel,
  Select,
  FormControl
} from '@material-ui/core';

function AddCategoryTypeforGraph() {
  const classes = useStyles();
  const [type, setType] = React.useState('');
  const [state, setState] = React.useState('');

  const getListCategories = (label: string) => {
    return (
      <Select
        labelId="select-filled-label"
        id="select-filled"
        value={type}
        onChange={handleCategoryChange}
        label="Table name"
      >
        <MenuItem value="Type of Graph">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>Industry</MenuItem>
        <MenuItem value={2}>Demographics</MenuItem>
        <MenuItem value={3}>Assets</MenuItem>
        <MenuItem value={4}>Education</MenuItem>
        <MenuItem value={4}>housing and Living</MenuItem>
        <MenuItem value={4}>Health</MenuItem>
      </Select>
    );
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setType(event.target.value as string);
  };

  return (
    <form className={classes.root}>
      <StyledFormGroup>
        <StyledFormGroup row={true}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-label">Category Name</InputLabel>
            {getListCategories('Category Name')}
          </FormControl>
        </StyledFormGroup>
      </StyledFormGroup>
    </form>
  );
}

export default AddCategoryTypeforGraph;

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
