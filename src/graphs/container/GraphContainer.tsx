import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGraphsForInitiativeAction } from '../../redux/graphs/actions';
import { HEALTH } from '../../redux/graphs/constants';
import { getGraphs } from '../../redux/graphs/selector';
import GraphPrebuilt from '../components/GraphPrebuilt';
import { StyledGraphComponent, StyledGraphContainer } from './styles';
import GraphCreate from '../components/GraphCreate';

/*
 * Renders a list of graphs.
 * Note: Only prebuilt graphs are supported, but this will change
 *       when the backend is connected.
 */
function GraphContainer() {
  const graphState = useSelector(getGraphs);
  const dispatch = useDispatch();

  // Use the prebuilt health graphs as the default graphs
  useEffect(() => {
    dispatch(addGraphsForInitiativeAction(HEALTH));
  }, [dispatch]);

  /*
   * Creates a component for each graph. A graph component contains
   * the chart itself, and the header with a set of options.
   */
  const getGraphComponents = () => {
    return graphState.graphs.map((graph, index) => (
      <StyledGraphComponent key={index}>
        <GraphPrebuilt graph={graph} />
      </StyledGraphComponent>
    ));
  };

  return <StyledGraphContainer>
      {getGraphComponents()}
      <GraphCreate/>
    </StyledGraphContainer>;
}

export default GraphContainer;
