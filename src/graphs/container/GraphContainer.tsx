import { CircularProgress, Grid, styled } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDefaultGraphs } from '../../redux/graphbuilder/actions';
import { getGraphs } from '../../redux/graphbuilder/selector';
import { HEALTH } from '../../redux/graphs/constants';
import { getVizbuilder } from '../../redux/vizbuilder/selector';
import { GraphCard } from '../components/GraphCard';
import { generateEmptyGraph } from '../forms/defaults';
import { GraphCreateForm } from '../forms/GraphCreateForm';
import { CIRCULAR_PROGRESS_SIZE } from './constants';

/*
 * Renders a list of graphs.
 */
function GraphContainer() {
  const graphState = useSelector(getGraphs);
  const vizState = useSelector(getVizbuilder);
  const dispatch = useDispatch();

  // Use the prebuilt health graphs as the default graphs
  useEffect(() => {
    dispatch(getDefaultGraphs(HEALTH));
  }, [dispatch]);

  /*
   * Creates a component for each graph. A graph component contains
   * the graph itself, and the toolbar.
   */
  const getGraphComponents = () => {
    return graphState.graphs.map((graph, index) => (
      <GridItem item key={index}>
        <GraphCard graph={graph} index={index} />
      </GridItem>
    ));
  };

  return (
    <GridContainer container>
      {/* Show loader while fetching */}
      {graphState.isFetching ? (
        <CircularProgress color="primary" size={CIRCULAR_PROGRESS_SIZE} />
      ) : null}
      {/* Show graphs while not creating or fetching */}
      {!graphState.isCreating && !graphState.isFetching
        ? getGraphComponents()
        : null}
      {/* Show the create form when creating */}
      {graphState.isCreating ? (
        <GraphCreateForm
          graph={generateEmptyGraph(vizState.metadataForAllDatasets)}
          datasetsMetaData={vizState.metadataForAllDatasets}
        />
      ) : null}
    </GridContainer>
  );
}

export default GraphContainer;

/*
 * Styles
 */
const GridContainer = styled(Grid)({
  justifyContent: 'center',
  overflow: 'scroll',
  padding: '10px 0px 10px 0px'
});

const GridItem = styled(Grid)({
  width: '95%',
  maxWidth: 'calc(100vw/2.2)',
  padding: '10px 10px 10px 20px'
});
