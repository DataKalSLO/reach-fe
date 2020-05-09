import React from 'react';
import {
  Box,
  styled,
  TextField,
  makeStyles,
  FormLabel,
  FormGroup,
  MenuItem,
  InputLabel,
  Select,
  FormControl
} from '@material-ui/core';

function AddDataSet() {
  const classes = useStyles();
  const TITLE_CHAR_LIMIT = 100;

  const [type, setType] = React.useState('');
  const [state, setState] = React.useState('');

  const getTextField = (label: string) => {
    return (
      <StyledTextField
        id="graph-title-field"
        label={label}
        variant="outlined"
        size="small"
        inputProps={{ maxLength: TITLE_CHAR_LIMIT }}
      />
    );
  };

  const getListTables = (label: string) => {
    return (
      <Select
        labelId="select-filled-label"
        id="select-filled"
        value={type}
        onChange={handleChange}
        label="Table name"
      >
        <MenuItem value="Type of Graph">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>DOD Contracts</MenuItem>
        <MenuItem value={2}>Education</MenuItem>
        <MenuItem value={3}>Health</MenuItem>
        <MenuItem value={4}>Covid-19</MenuItem>
      </Select>
    );
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  return (
    <form className={classes.root}>
      <FormLabel>First DataSet</FormLabel>
      <StyledFormGroup>
        <StyledFormGroup row={true}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-label">Table Name</InputLabel>
            {getListTables('Table Name')}
          </FormControl>
        </StyledFormGroup>
      </StyledFormGroup>
    </form>
  );
}

export default AddDataSet;

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
