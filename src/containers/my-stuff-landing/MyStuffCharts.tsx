import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import GraphCard from '../../preview-cards/graph-card/GraphCard';
import { GraphMetaData } from '../../redux/graphs/types';
import React, { useState, useEffect } from 'react';
import { isUndefined } from 'util';
import { getAllGraphsAndHandleResponse } from '../../api/graphs/operationHandlers';

const [graphs, setGraphs] = useState([] as GraphMetaData[]);

export default function MyStuffCharts() {
  useEffect(() => {
    getAllGraphsAndHandleResponse().then(response => {
      if (!isUndefined(response)) {
        setGraphs(response);
      }
    });
  });
  return (
    <MyStuffWrapper title="My Charts">
      {graphs.map(graph => (
        <GraphCard key={graph.graphId} {...graph} />
      ))}
    </MyStuffWrapper>
  );
}
