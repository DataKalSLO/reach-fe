import {
  Grid,
  Paper,
  Button,
  styled,
  CardContent,
  Box,
  Typography
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

  const LoadMore = () => (
    <StyledPaper>
      <Typography variant="h6">Load More...</Typography>
    </StyledPaper>
  );
  const graphs = [
    defenseGraph,
    MedianIncomeGraph,
    IncomeInequalityGraph,
    RealMeanWagesGraph,
    MilesTraveledGraph,
    AirportsGraph,
    HighSchoolGraph,
    CollegeGraph,
    LoadMore
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
              onClick={() => {
                setSelectedGraph(index);
                setExploring(false);
              }}
            />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return <GraphBlockContainer>{graphs[selectedGraph]}</GraphBlockContainer>;
  }
};

export default GraphBlock;

const GraphBlockContainer = styled(Box)({});

const StyledPaper = styled(Paper)({
  flexGrow: 1,
  border: '1px solid #cbcbcb', // same border style is used in EditorToolbar
  borderRadius: '4px',
  padding: '100px',
  textAlign: 'center'
});
