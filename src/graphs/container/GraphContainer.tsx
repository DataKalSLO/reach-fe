import { Grid, styled } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserGraphs } from '../../redux/graphbuilder/actions';
import { getGraphsMetaData } from '../../redux/graphbuilder/selector';
import GraphPrebuilt from '../components/GraphPrebuilt';
import FormCreate from '../forms/CreateGraphForm';
import { GraphCreateForm } from '../forms/GraphCreateForm';

/*
 * Renders a list of graphs.
 * Note: Only prebuilt graphs are supported, but this will change
 *       when the backend is connected.
 */
function GraphContainer() {
  const graphState = useSelector(getGraphsMetaData);
  const dispatch = useDispatch();

  // Use the prebuilt health graphs as the default graphs
  useEffect(() => {
    dispatch(getAllUserGraphs());
  }, [dispatch]);

  /*
   * Creates a component for each graph. A graph component contains
   * the graph itself, and the toolbar.
   */
  const getGraphComponents = () => {
    console.log(graphState.graphs);
    return graphState.graphs.map((graph, index) => (
      <GridItem item key={index}>
        <GraphPrebuilt graph={graph} index={index} />
      </GridItem>
    ));
  };

  return (
    <GridContainer container>
      <GridItem>
        {graphState.isCreating ? <GraphCreateForm /> : getGraphComponents()}
      </GridItem>
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
  width: '90%',
  maxWidth: 'calc(100vw/2.2)',
  padding: '10px 10px 10px 20px'
});
