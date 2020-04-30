import { createStyles, IconButton, makeStyles, Theme, styled, Box } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { Close } from '@material-ui/icons';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { editingGraphAction } from '../../redux/graphs/actions';
import GraphEditForm from './GraphEditForm';
import { GraphHeaderProps } from './types';

function GraphEditBottom() {
  const dispatch = useDispatch();
  const classes = useGraphEditStyles();
  return (
      <StyledBox>
        <GraphEditForm />
      </StyledBox>
  );
}

export default GraphEditBottom;

const StyledBox = styled(Box)({
  height: '50%',
  width: '90%',
  paddingTop: '20px'
});

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
