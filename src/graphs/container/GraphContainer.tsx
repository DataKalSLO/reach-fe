import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGraphs } from '../../redux/graphs/selector';
import GraphPrebuilt from '../components/GraphPrebuilt';
import { StyledGraphComponent, StyledGraphContainer } from './styles';
import { HEALTH } from '../../redux/graphs/constants';
import { addGraphsForInitiativeAction } from '../../redux/graphs/actions';

/*
 * Renders a list of graphs.
 * Note: Only prebuilt graphs are supported, but this will change
 *       when the backend is connected.
 */
function GraphContainer() {
  const graphState = useSelector(getGraphs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addGraphsForInitiativeAction(HEALTH));
  }, []);

  /*
   * Creates a component for each graph. The default graph is separately
   * appended since the graph is read directly from a JSON file rather
   * than being stored in the store (since it is not currently supported).
   * A graph component contains the chart itself, and the header with a
   * set of options.
   */
  const getGraphComponents = () => {
    return graphState.graphs.map((graph, index) => (
      <StyledGraphComponent key={index}>
        <GraphPrebuilt graph={graph} />
      </StyledGraphComponent>
    ));
  };

  return <StyledGraphContainer>{getGraphComponents()}</StyledGraphContainer>;
}

export default GraphContainer;
