import { Toolbar } from '@material-ui/core';
import { Delete, Edit, FileCopy, Save, Share } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { Props as ButtonProps } from '../../common/components/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {
  deleteGraphAction,
  duplicateGraphAction
} from '../../redux/graphs/actions';
import {
  DELETE_LABEL,
  DUPLICATE_LABEL,
  EDIT_LABEL,
  SAVE_LABEL,
  SHARE_LABEL,
  SHOW_LABEL,
  HIDE_LABEL
} from './constants';
import { GraphHeaderProps } from './types';
import { GraphMetaDataApiPayload } from '../../redux/graphs/types';
import { saveGraph } from '../../api/graphs/operations';
import {
  updateGraph,
  deleteGraph,
  duplicateGraph
} from '../../redux/graphbuilder/actions';
import { getUser } from '../../redux/login/selectors';

/*
 * Contains the buttons rendered on the graph toolbar.
 */

const ToolbarButton = (props: ButtonProps) => {
  return <Button variant="text" color="default" {...props} />;
};

function GraphToolbar(props: GraphHeaderProps) {
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
        onClick={() =>
          graph.graphMetaData.graphId === ''
            ? dispatch(saveGraph(newGraph))
            : dispatch(updateGraph(newGraph))
        }
      />
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
