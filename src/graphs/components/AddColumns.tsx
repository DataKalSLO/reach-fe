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
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  InputLabel,
  Input,
  ListItemText,
  useTheme
} from '@material-ui/core';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
const names = [
  'Column 1',
  'Column 2',
  'Column 3',
  'Column 4',
  'Column 5',
  'Column 6',
  'Column 7',
  'Column 8',
  'Column 9',
  'Column 10'
];

function AddColumns() {
  const classes = useStyles();

  const [type, setType] = React.useState('');
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleYaxisChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

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

  const getYAxisList = (label: string) => {
    return (
      <Select
        labelId="select-filled-label"
        id="select-filled"
        multiple
        value={personName}
        onChange={handleYaxisChange}
        input={<Input />}
        renderValue={selected => (selected as string[]).join(', ')}
        MenuProps={MenuProps}
      >
        {names.map(name => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={personName.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    );
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  return (
    <form className={classes.root}>
      <FormLabel>Choose your X-axis</FormLabel>
      <StyledFormGroup row={true}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="select-label">Column Name</InputLabel>
          {getListItem('List of Columns')}
        </FormControl>
      </StyledFormGroup>
      <StyledFormGroup row={false}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="select-label">Choose your Y-axis</InputLabel>
          {getYAxisList('List of Columns')}
        </FormControl>
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
