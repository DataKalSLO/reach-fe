import { Toolbar } from '@material-ui/core';
import { Delete, Edit, FileCopy, Save, Share } from '@material-ui/icons';
import SyncIcon from '@material-ui/icons/Sync';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import React from 'react';
import { useDispatch } from 'react-redux';
import Button, { Props as ButtonProps } from '../../common/components/Button';
import { deleteGraph, duplicateGraph, editGraph, hideGraph, saveGraph, updateGraph } from '../../redux/graphbuilder/actions';
import { GraphMetaDataApiPayload } from '../../redux/graphbuilder/types';
import { DELETE_LABEL, DUPLICATE_LABEL, EDIT_LABEL, HIDE_LABEL, SAVE_LABEL, SHARE_LABEL, SHOW_LABEL, SYNCHRONIZE_MAP } from './constants';
import { GraphToolbarProps } from './types';
/*
 * Contains the buttons rendered on the graph toolbar.
 */

const ToolbarButton = (props: ButtonProps) => {
  return <Button variant="text" color="default" {...props} />;
};

function GraphToolbar(props: GraphToolbarProps) {
  const dispatch = useDispatch();
  const { graph, category, graphSVG, index } = props;
  const newGraph: GraphMetaDataApiPayload = {
    graphId: graph.graphMetaData.graphId,
    graphCategory: category,
    graphTitle: graph.graphMetaData.graphTitle,
    dataSources: graph.graphMetaData.dataSources,
    graphOptions: graph.graphMetaData.graphOptions,
    graphSVG: graphSVG
  };

  // TODO: Collapse toolbar when width is too small
  return (
    <Toolbar>
      <ToolbarButton
        label={SYNCHRONIZE_MAP}
        variant="text"
        color="default"
        startIcon={<SyncIcon />}
        //onClick={() => dispatch(syncGraph(graph.graphMetaData.graphId))}
        onClick={() => {alert('not inplemented')}}   
      />
      <ToolbarButton
        label={EDIT_LABEL}
        variant="text"
        color="default"
        startIcon={<Edit />}
        onClick={() => dispatch(editGraph(index))}
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
        label={graph.isHidden ? SHOW_LABEL : HIDE_LABEL}
        startIcon={graph.isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
        onClick={() => dispatch(hideGraph(graph.graphMetaData.graphId))}
      />
      <ToolbarButton
        label={SHARE_LABEL}
        startIcon={<Share />}
        onClick={() => alert('not implemented')}
      />
      <ToolbarButton
        label={DELETE_LABEL}
        startIcon={<Delete color="error" />}
        onClick={() => dispatch(deleteGraph(graph.graphMetaData.graphId))}
      />
    </Toolbar>
  );
}

export default GraphToolbar;
