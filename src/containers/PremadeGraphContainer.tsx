import React from 'react';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import {
  IndustryStatsGraph,
  defenseGraph,
  MedianIncomeGraph,
  IncomeInequalityGraph,
  RealMeanWagesGraph,
  MilesTraveledGraph,
  AirportsGraph,
  HighSchoolGraph,
  CollegeGraph,
  MedianListGraph,
  MedianSaleGraph
} from '../graphs/demo-graphs/PremadeGraphs';

function PremadeGraphContainer() {
  const { graphId } = useParams();

  const getGraph = () => {
    switch (graphId) {
      case 'airport':
        return AirportsGraph();
      case 'highschool':
        return HighSchoolGraph();
      case 'industry':
        return IndustryStatsGraph();
      case 'defense':
        return defenseGraph();
      case 'medianincome':
        return MedianIncomeGraph();
      case 'incomeinequality':
        return IncomeInequalityGraph();
      case 'realmeanwages':
        return RealMeanWagesGraph();
      case 'milestraveled':
        return MilesTraveledGraph();
      case 'college':
        return CollegeGraph();
      case 'medianlist':
        return MedianListGraph();
      case 'mediansale':
        return MedianSaleGraph();
      default:
        return <div>No graph found.</div>;
    }
  };

  return (
    <Box marginTop="50px" textAlign="center">
      <Box display="inline-block">{getGraph()}</Box>
    </Box>
  );
}

export default PremadeGraphContainer;
