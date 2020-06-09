import React, { useEffect, useState } from 'react';
import { isUndefined } from 'util';
import { getAllGraphsAndHandleResponse } from '../../api/graphs/operationHandlers';
import { setTab } from '../../common/components/PersistentDrawer';
import { GRAPHS_TAB_TITLE } from '../../my-stuff/MyStuffSidebar';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import GraphCard from '../../preview-cards/graph-card/GraphCard';
import { MY_STUFF_SIDEBAR } from '../../reach-ui/constants';
import { GraphMetaData } from '../../redux/graphs/types';

export default function MyStuffGraphs() {
  const [graphs, setGraphs] = useState([] as GraphMetaData[]);

  // ensures correct tab is selected in the MyStuffSidebar
  setTab(MY_STUFF_SIDEBAR, GRAPHS_TAB_TITLE);

  useEffect(() => {
    getAllGraphsAndHandleResponse().then(response => {
      if (!isUndefined(response)) {
        setGraphs(response);
      }
    });
  }, []);

  const makeStoryCards = () =>
    graphs.map(graph => (
      <GraphCard
        key={graph.graphId}
        graphMetaData={graph}
        onClick={() => console.log('User clicked a graph.')}
      />
    ));

  return (
    <MyStuffWrapper
      title="My Graphs"
      emptyStateMessage={
        "You haven't saved any graphs yet. Make your first one using the VizBuilder!"
      }
    >
      {makeStoryCards()}
    </MyStuffWrapper>
  );
}
