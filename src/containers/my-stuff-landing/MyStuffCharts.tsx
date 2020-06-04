import React, { useEffect, useState } from 'react';
import { isUndefined } from 'util';
import { getAllGraphsAndHandleResponse } from '../../api/graphs/operationHandlers';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import GraphCard from '../../preview-cards/graph-card/GraphCard';
import { GraphMetaData } from '../../redux/graphs/types';

export default function MyStuffCharts() {
  const [graphs, setGraphs] = useState([] as GraphMetaData[]);

  useEffect(() => {
    getAllGraphsAndHandleResponse().then(response => {
      if (!isUndefined(response)) {
        setGraphs(response);
      }
    });
  }, []);

  return (
    <MyStuffWrapper title="My Charts">
      {graphs.map(graph => (
        <GraphCard key={graph.graphId} {...graph} />
      ))}
    </MyStuffWrapper>
  );
}
