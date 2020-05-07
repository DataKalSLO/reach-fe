import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { GraphHeaderProps } from './types';
import { StyledBox } from '../../stories/RichTextEditor';
import GraphCreateForm from './GraphCreateForm';

function GraphCreate({ graph }: GraphHeaderProps) {
  const dispatch = useDispatch();
  const classes = useGraphEditStyles();
  const state = {
    step: 1,
    TableName: '',
    Column1Name: '',
    Column2Name: '',
    Title: '',
    Subtitle: '',
    Gridlines: '',
    X_Axis_Label: '',
    X_Axis_Prefix: '',
    X_Axis_Suffix: '',
    Y_Axis_Label: '',
    Y_Axis_Prefix: '',
    Y_Axis_Suffix: '',
    Series_Type: '',
    Serie_Name: '',
    Serie_Color: ''
  };

  return (
    <StyledBox>
      <GraphCreateForm />
    </StyledBox>
  );
}

export default GraphCreate;

const useGraphEditStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    drawer: {
      width: '100%',
      backgroundColor: 'transparent',
      flexShrink: 0
    },
    drawerPaper: {
      position: 'absolute',
      bottom: 0,
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      border: '1px solid slategrey',
      padding: '20px',
      margin: '10px'
    },
    hide: {
      display: 'none'
    },
    button: {
      position: 'absolute',
      top: 0,
      right: 0,
      color: 'red',
      margin: theme.spacing(1)
    }
  })
);
