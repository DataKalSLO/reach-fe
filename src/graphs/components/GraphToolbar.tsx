import { Toolbar } from '@material-ui/core';
import { Delete, Edit, FileCopy, Save, Share } from '@material-ui/icons';
import SyncIcon from '@material-ui/icons/Sync';
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
import {
  isLocalGraph,
  userOwnsGraph
} from '../../redux/graphbuilder/utilities';
import { GraphMetaDataApiPayload } from '../../redux/graphs/types';
import { getUser } from '../../redux/login/selectors';
import { isDefinedElse } from '../forms/utilities';
import {
  DELETE_LABEL,
  DUPLICATE_LABEL,
  EDIT_LABEL,
  HIDE_LABEL,
  SAVE_LABEL,
  SHARE_LABEL,
  SHOW_LABEL,
  SYNC_LABEL
} from './constants';
import { GraphToolbarProps } from './types';
import { syncGraphAction } from '../../redux/vizbuilder/actions';
import {
  getFeatureCollection,
  addselectedTableAction,
  updateSelectedColumn
} from '../../redux/map/actions';
import { getVizbuilder } from '../../redux/vizbuilder/selector';

/*
 * Contains the buttons rendered on the graph toolbar.
 */
const ToolbarButton = (props: ButtonProps) => {
  return <Button variant="text" color="default" {...props} />;
};

function GraphToolbar(props: GraphToolbarProps) {
  const { graph, index, isHidden, graphSVG, toggleEdit, toggleHide } = props;
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const vizBuilderState = useSelector(getVizbuilder);

  const graphIsLocal = isLocalGraph(graph);
  const isUserGraph = userOwnsGraph(graph, user);

  const newGraph: GraphMetaDataApiPayload = {
    graphId: graph.graphMetaData.graphId,
    graphCategory: isDefinedElse(graph.graphCategory, null),
    graphTitle: graph.graphMetaData.graphTitle,
    dataSources: graph.graphMetaData.dataSources,
    graphOptions: graph.graphMetaData.graphOptions,
    graphSVG: btoa(graphSVG)
  };

  // TODO: Collapse toolbar when width is too small
  return (
    <Toolbar>
      <ToolbarButton
        label={SYNC_LABEL}
        variant="text"
        color="default"
        startIcon={<SyncIcon />}
        onClick={() => {
          console.log(newGraph.dataSources);
          const yAxisDataSource = newGraph.dataSources.filter(
            source => source.seriesType === 'Y_AXIS'
          )[0];
          const tableName = yAxisDataSource.datasetName;
          const targetSelection = vizBuilderState.datasetTableNames.filter(
            selection => selection.tableName === tableName
          )[0];
          getFeatureCollection(tableName, targetSelection.geoType)(dispatch);
          dispatch(addselectedTableAction(targetSelection));

          // Default to first column name
          dispatch(updateSelectedColumn(yAxisDataSource.columnNames[0]));
        }}
      />
      <ToolbarButton
        label={EDIT_LABEL}
        variant="text"
        color="default"
        startIcon={<Edit />}
        onClick={() => toggleEdit()}
      />
      {/* save graph owned by the user */}
      {graphIsLocal || isUserGraph ? (
        <ToolbarButton
          label={SAVE_LABEL}
          startIcon={<Save />}
          onClick={() =>
            isLocalGraph
              ? dispatch(saveGraph(newGraph))
              : dispatch(updateGraph(newGraph))
          }
        />
      ) : null}
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
      {!graphIsLocal && isUserGraph ? (
        <ToolbarButton
          label={DELETE_LABEL}
          startIcon={<Delete color="error" />}
          onClick={() => dispatch(deleteGraph(graph.graphMetaData.graphId))}
        />
      ) : null}
      {/* Delete locally created graphs */}
      {graphIsLocal ? (
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
