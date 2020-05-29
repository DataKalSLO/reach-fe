import { Toolbar } from '@material-ui/core';
import { Delete, Edit, FileCopy, Save, Share } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { Props as ButtonProps } from '../../common/components/Button';
import {
  deleteGraph,
  deleteLocalGraph,
  duplicateGraph,
  saveGraph,
  updateGraph
} from '../../redux/graphbuilder/actions';
import { GraphMetaDataApiPayload } from '../../redux/graphs/types';
import { getUser } from '../../redux/login/selectors';
import {
  DELETE_LABEL,
  DUPLICATE_LABEL,
  EDIT_LABEL,
  HIDE_LABEL,
  SAVE_LABEL,
  SHARE_LABEL,
  SHOW_LABEL
} from './constants';
import { GraphToolbarProps } from './types';

/*
 * Contains the buttons rendered on the graph toolbar.
 */
const ToolbarButton = (props: ButtonProps) => {
  return <Button variant="text" color="default" {...props} />;
};

function GraphToolbar(props: GraphToolbarProps) {
  const { graph, index, isHidden, graphSVG, toggleEdit, toggleHide } = props;
  const dispatch = useDispatch();
  const userInfo = useSelector(getUser);

  // Duplicated graphs do not have an Id until they are saved
  const isLocalGraph = graph.graphMetaData.graphId === '';
  const userOwnsGraph = userInfo.email === graph.graphMetaData.userId;

  const newGraph: GraphMetaDataApiPayload = {
    graphId: graph.graphMetaData.graphId,
    graphCategory: null,
    graphTitle: graph.graphMetaData.graphTitle,
    dataSources: graph.graphMetaData.dataSources,
    graphOptions: graph.graphMetaData.graphOptions,
    graphSVG: graphSVG
  };

  // TODO: Collapse toolbar when width is too small
  return (
    <Toolbar>
      <ToolbarButton
        label={EDIT_LABEL}
        variant="text"
        color="default"
        startIcon={<Edit />}
        onClick={() => alert('not implemented yet')}
      />
      <ToolbarButton
        label={SAVE_LABEL}
        startIcon={<Save />}
        onClick={() =>
          isLocalGraph
            ? dispatch(saveGraph(newGraph))
            : dispatch(updateGraph(newGraph))
        }
      />
      <ToolbarButton
        label={isHidden ? SHOW_LABEL : HIDE_LABEL}
        startIcon={isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
        onClick={() => toggleHide()}
      />
      <ToolbarButton
        label={DUPLICATE_LABEL}
        startIcon={<FileCopy />}
        onClick={() => dispatch(duplicateGraph(graph, index))}
      />
      <ToolbarButton
        label={SHARE_LABEL}
        startIcon={<Share />}
        onClick={() => alert('Not implemented')}
      />
      {/* Delete saved graphs owned by the user */}
      {!isLocalGraph && userOwnsGraph ? (
        <ToolbarButton
          label={DELETE_LABEL}
          startIcon={<Delete color="error" />}
          onClick={() => dispatch(deleteGraph(graph.graphMetaData.graphId))}
        />
      ) : null}
      {/* Delete locally created graphs */}
      {isLocalGraph ? (
        <ToolbarButton
          label={DELETE_LABEL}
          startIcon={<Delete color="error" />}
          onClick={() => dispatch(deleteLocalGraph(index))}
        />
      ) : null}
    </Toolbar>
  );
}

export default GraphToolbar;
