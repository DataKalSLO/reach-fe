import {
  Grid,
  Paper,
  Button,
  styled,
  CardContent,
  Box
} from '@material-ui/core';
import React, { useState } from 'react';
import {
  AirportsGraph,
  CollegeGraph,
  defenseGraph,
  HighSchoolGraph,
  IncomeInequalityGraph,
  MedianIncomeGraph,
  MilesTraveledGraph,
  RealMeanWagesGraph
} from '../graphs/demo-graphs/PremadeGraphs';
import { GraphPreviewCard } from './GraphPreviewCard';

const GraphBlock = () => {
  const [isExploring, setExploring] = useState(true);
  const [selectedGraph, setSelectedGraph] = useState(0);

  const graphs = [
    defenseGraph,
    MedianIncomeGraph,
    IncomeInequalityGraph,
    RealMeanWagesGraph,
    MilesTraveledGraph,
    AirportsGraph,
    HighSchoolGraph,
    CollegeGraph
  ];

  if (isExploring) {
    return (
      <Grid container spacing={5}>
        {graphs.map((value, index) => (
          <Grid item key={index} xs={12} sm={4}>
            <GraphPreviewCard
              key={index}
              index={index}
              value={value}
              onClick={() => setExploring(false)}
            />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return (
      <GraphBlockContainer>
        {/* HACK: hardcoded */}
        <MedianIncomeGraph />
      </GraphBlockContainer>
    );
  }
};

export default GraphBlock;

const GraphBlockContainer = styled(Box)({
  width: '40%',
  height: '50%',
  margin: 'auto'
});
