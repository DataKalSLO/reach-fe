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
  RealMeanWagesGraph,
  MedianSaleGraph
} from '../graphs/demo-graphs/PremadeGraphs';
import { GraphPreviewCard } from './GraphBlockPreviewCard';
import { useDispatch } from 'react-redux';
import { updateGraphBlock } from '../redux/story/actions';

//TODO: replace with a proper button that loads more premade graphs
const LoadMore = () => (
  <StyledPaper>
    <Typography variant="h6">Load More...</Typography>
  </StyledPaper>
);
export const graphs = [
  defenseGraph,
  IncomeInequalityGraph,
  MedianSaleGraph,
  RealMeanWagesGraph,
  MilesTraveledGraph,
  AirportsGraph,
  HighSchoolGraph,
  CollegeGraph,
  LoadMore
];

export const selectedGraph = (graphId: number) => (
  <GraphBlockContainer>{graphs[graphId]}</GraphBlockContainer>
);

interface Props {
  graphId: number;
  setGraphId: (n: number) => void;
}
const GraphBlock = (props: Props) => {
  const [isExploring, setExploring] = useState(true);
  const { graphId, setGraphId } = props; // this is NOT a hook, the state is being managed in StoryForm

  if (isExploring) {
    return (
      <Grid container spacing={5}>
        {graphs.map((graph, index) => (
          <Grid item key={index} xs={12} sm={4}>
            <GraphPreviewCard
              key={index}
              index={index}
              graph={graph}
              onClick={() => {
                setGraphId(index);
                setExploring(false);
              }}
            />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return selectedGraph(graphId);
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
