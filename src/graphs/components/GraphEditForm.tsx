import React, { Fragment } from 'react';
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
  Button,
  Menu
} from '@material-ui/core';
import { SliderPicker } from 'react-color';
import { uuid } from 'uuidv4';

function GraphEditForm() {
  const classes = useStyles();
  const graphFields = ['Title', 'Subtitle', 'Gridlines'];
  const xFields = ['X-Axis Label', 'X-Axis Prefix', 'X-Axis Suffix'];
  const yFields = ['Y-Axis Label', 'Y-Axis Prefix', 'Y-Axis Suffix'];
  const seriesFields = ['Series Type', 'Series Name', 'Series Color'];

  const getTextField = (label: string) => {
    return (
      <StyledTextField
        id="graph-title-field"
        label={label}
        variant="outlined"
        size="small"
        inputProps={{ maxLength: 100 }}
      />
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
        <FormGroup row={true}>
          {getTextField('Name')}
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="outlined"
          >
            Series Type
          </Button>
        </FormGroup>
        <SliderPicker />
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
  }
}));
