import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as cnst from './constants';
import { useGraphHeaderStyles } from '../container/styles';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from '@material-ui/core';


/*
 * Code for drawer that opens up when "format" button is clicked.
 */

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    list: {
      width: 350
    },
    item: {
      width: '100%'
    }
  }),
);

function GraphFormattingButton() {
  const classes2 = useStyles();
  const classes = useGraphHeaderStyles();
  const listClass = useStyles();
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  
  const handleDrawerOpen = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const [type, setType] = React.useState('');

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current!.offsetWidth);
  // }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  return (
    <div>
      <Button
        variant = "contained"
        style={{
            position:'absolute',
            bottom:27,
            left: 11,
            backgroundColor: 'white',
        }}
        onClick={handleDrawerOpen}>
        {cnst.FORMAT_LABEL}
      </Button>
      <Drawer anchor="bottom" open={drawerVisible} onClose={handleDrawerClose}>
        <div className={listClass.list} role="presentation">
          <List>
            <ListItem>
                <ListItemIcon>
                  <InsertChartIcon/>
                </ListItemIcon>
                <FormControl variant="filled" className={classes2.formControl}>
                  <InputLabel id="demo-simple-select-filled-label">Type of Graph</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={type}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Line</MenuItem>
                    <MenuItem value={2}>Bar</MenuItem>
                    <MenuItem value={3}>Column</MenuItem>
                    <MenuItem value={4}>Bar</MenuItem>
                    <MenuItem value={5}>Column</MenuItem>
                  </Select>
                </FormControl>
            </ListItem>
            <ListItem>
              <ListItemText>Title</ListItemText>
              <form className={listClass.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Graph Title" variant="outlined" />
              </form>
            </ListItem>
            <ListItem>
              <ListItemText>Subtitle</ListItemText>
              <form className={listClass.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Graph Subtitle" variant="outlined" />
              </form>
            </ListItem>
            <ListItem>
              <ListItemText>X-Axis</ListItemText>
              <form className={listClass.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="X-axis name" variant="outlined" />
              </form>
            </ListItem>
            <ListItem>
              <ListItemText>Y-Axis</ListItemText>
              <form className={listClass.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Y-axis-name" variant="outlined" />
              </form>
            </ListItem>
            
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default GraphFormattingButton;
