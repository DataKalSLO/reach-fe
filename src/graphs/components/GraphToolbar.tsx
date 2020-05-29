import { makeStyles, Snackbar, Theme, Toolbar } from '@material-ui/core';
import { Delete, Edit, FileCopy, Save, Share } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveGraph } from '../../api/graphs/operations';
import Button, { Props as ButtonProps } from '../../common/components/Button';
import { deleteGraph, duplicateGraph, updateGraph } from '../../redux/graphbuilder/actions';
import { GraphMetaDataApiPayload } from '../../redux/graphs/types';
import { getUser } from '../../redux/login/selectors';
import { DELETE_LABEL, DUPLICATE_LABEL, EDIT_LABEL, HIDE_LABEL, SAVE_LABEL, SHARE_LABEL, SHOW_LABEL } from './constants';
import { GraphHeaderProps } from './types';

/*
 * Contains the buttons rendered on the graph toolbar.
 */

const ToolbarButton = (props: ButtonProps) => {
  return <Button variant="text" color="info" {...props} />;
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

function GraphToolbar(props: GraphHeaderProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const { graph, index, isHidden, toggleEdit, toggleHide } = props;
  const dispatch = useDispatch();
  const userInfo = useSelector(getUser);
  const newGraph: GraphMetaDataApiPayload = {
    graphId: graph.graphMetaData.graphId,
    graphCategory: null,
    graphTitle: graph.graphMetaData.graphTitle,
    dataSources: graph.graphMetaData.dataSources,
    graphOptions: graph.graphMetaData.graphOptions,
    graphSVG: ''
  };

  const userOwnsGraph = userInfo.email === graph.graphMetaData.userId;

  // TODO: Collapse toolbar when width is too small
  return (
    <Toolbar>
      <ToolbarButton
        label={EDIT_LABEL}
        variant="text"
        color="default"
        startIcon={<Edit />}
        onClick={() => toggleEdit()}
      />
      <ToolbarButton
        label={SAVE_LABEL}
        startIcon={<Save />}
        onClick={() => {
          graph.graphMetaData.graphId === ''
            ? dispatch(saveGraph(newGraph))
            : dispatch(updateGraph(newGraph));
          handleClick();
        }}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success">
          Saving was a success!
        </Alert>
      </Snackbar>
      <ToolbarButton
        label={DUPLICATE_LABEL}
        startIcon={<FileCopy />}
        onClick={() => dispatch(duplicateGraph(graph, index))}
      />
      <ToolbarButton
        label={isHidden ? SHOW_LABEL : HIDE_LABEL}
        startIcon={isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
        onClick={() => toggleHide()}
      />
      <ToolbarButton
        label={SHARE_LABEL}
        startIcon={<Share />}
        onClick={() => alert('Not implemented')}
      />
      {userOwnsGraph ? (
        <ToolbarButton
          label={DELETE_LABEL}
          startIcon={<Delete color={userOwnsGraph ? 'error' : 'inherit'} />}
          onClick={() => dispatch(deleteGraph(graph.graphMetaData.graphId))}
        />
      ) : null}
    </Toolbar>
  );
}

export default GraphToolbar;
