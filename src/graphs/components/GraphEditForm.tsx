import React from 'react';
import {
  Box,
  styled,
  TextField,
  makeStyles,
  Switch,
  FormControlLabel,
  FormLabel,
  FormGroup,
  MenuItem,
  Menu,
  InputLabel,
  Select,
  FormControl
} from '@material-ui/core';
import { SliderPicker } from 'react-color';
import { Button } from '../../common/components/Button';
import { uuid } from 'uuidv4';


function GraphEditForm() {
  const classes = useStyles();
  const graphFields = ['Title', 'Subtitle', 'Gridlines'];
  const xFields = ['X-Axis Label', 'X-Axis Prefix', 'X-Axis Suffix'];
  const yFields = ['Y-Axis Label', 'Y-Axis Prefix', 'Y-Axis Suffix'];
  const seriesFields = ['Series Type', 'Series Name', 'Series Color'];
  const TITLE_CHAR_LIMIT = 100;

  const [type, setType] = React.useState('');
  const [state,setState] = React.useState('');

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
        label= "Type of Chart"
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

  const getSwitch = (name: string) => {
    return (
      <FormControlLabel control={<Switch color="primary" />} label={name} />
    );
  };

  const getMenuItems = (options: string[]) => {
    return options.map(item => {
      return <MenuItem key={uuid()}>{item}</MenuItem>;
    });
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  const handleChangeComplete = (color: { hex: string; }) => {
    setState(color.hex as string);
  };



  return (
    <form className={classes.root}>
      <FormLabel>Group 1</FormLabel>
      <StyledFormGroup row={true}>
        {getTextField('Title')}
        {getTextField('Subtitle')}
        {getSwitch('Grid Lines')}
      </StyledFormGroup>
      <FormLabel>Group 2</FormLabel>
      <StyledFormGroup row={true}>
        {getTextField('X-Axis Label')}
        {getTextField('X-Axis Prefix')}
        {getTextField('X-Axis Suffix')}
      </StyledFormGroup>
      <FormLabel>Group 3</FormLabel>
      <StyledFormGroup row={true}>
        {getTextField('Y-Axis Label')}
        {getTextField('Y-Axis Prefix')}
        {getTextField('Y-Axis Suffix')}
      </StyledFormGroup>
      <FormLabel>Group 4</FormLabel>
      <StyledFormGroup>
        <StyledFormGroup row={true}>
          {getTextField('Serie Name')}
          <FormControl variant="outlined" className = {classes.formControl}>
            <InputLabel id="select-label">Type of Chart</InputLabel>
            {getListItem('Type of Graph')}   
          </FormControl>       
        </StyledFormGroup>
        <SliderPicker 
          onChangeComplete={handleChangeComplete}
        />
      </StyledFormGroup>
      <StyledFormGroup row ={true}>
      <Button
        label="Update Graph"
        variant="text"
        color="default"
        onClick={() => alert('Not implemented')}
      />
      </StyledFormGroup>
    </form>
  );
}

export default GraphEditForm;

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
    minWidth: 155,
  }
}));
