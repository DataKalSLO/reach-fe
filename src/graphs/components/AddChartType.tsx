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

function AddChartType() {
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

  const getListItem = (label: string) => {
    return (
      <Select
        labelId="select-filled-label"
        id="select-filled"
        value={type}
        onChange={handleChange}
        label="Type of Chart"
      >
        <MenuItem value="Type of Graph">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>Line</MenuItem>
        <MenuItem value={2}>Bar</MenuItem>
        <MenuItem value={3}>Column</MenuItem>
        <MenuItem value={4}>Pie</MenuItem>
      </Select>
    );
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  const handleChangeComplete = (color: { hex: string }) => {
    setState(color.hex as string);
  };

  return (
    <form className={classes.root}>
      <FormLabel>Chart Type</FormLabel>
      <StyledFormGroup>
        <StyledFormGroup row={true}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-label">Type of Chart</InputLabel>
            {getListItem('Type of Graph')}
          </FormControl>
        </StyledFormGroup>
      </StyledFormGroup>
    </form>
  );
}

export default AddChartType;

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
