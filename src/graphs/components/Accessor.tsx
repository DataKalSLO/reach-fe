import React from 'react';
import { useSelector } from 'react-redux';
import { uuid } from 'uuidv4';
import { DEMOGRAPHICS, INDUSTRY } from '../../redux/graphs/constants';
import { getGraphs } from '../../redux/graphs/selector';
import { GraphRecord } from '../../redux/graphs/types';
import {
  getGraphsForInitiative,
  getGraphWithIds
} from '../../redux/graphs/utilities';
import Graph from './Graph';

/*
 * Custom Hook to access graphs.
 * This hook grabs the prebuilt graphs stored in the redux store
 * and returns an array of prebuilt graph components.
 * TODO: require a userID to get graphs for that user.
 */

export function useGraphs() {
  const graphState = useSelector(getGraphs);
  // TODO: remove sampleGraphRecords and get graph options from backend.
  const sampleGraphRecords = getGraphWithIds(
    getGraphsForInitiative(INDUSTRY, graphState.initiatives)
  ).concat(
    getGraphWithIds(
      getGraphsForInitiative(DEMOGRAPHICS, graphState.initiatives)
    )
  );

  return sampleGraphRecords.map((graphRecord: GraphRecord) => (
    <Graph key={uuid()} graphRecord={graphRecord} />
  ));
}
