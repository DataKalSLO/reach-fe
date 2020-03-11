import { GraphState, GraphActionTypes } from './types';
import { defenseGraphData } from '../../graphs/predefined-graph-options/dod-2018';
import { incomeInequalityGraphData } from '../../graphs/predefined-graph-options/income-inequality';
import { wagesGraphData } from '../../graphs/predefined-graph-options/real-mean-wages';
import { airportsGraphData } from '../../graphs/predefined-graph-options/airports';
import { collegeGraphData } from '../../graphs/predefined-graph-options/college-graduates';
import { statsOfBusinessGraphData } from '../../graphs/predefined-graph-options/state-of-business';
import { medianIncomeGraphData } from '../../graphs/predefined-graph-options/median-income';
import { highschoolGraphData } from '../../graphs/predefined-graph-options/percent-highschool';
import { milesTraveledGraphData } from '../../graphs/predefined-graph-options/miles-traveled';
import { medianListGraphData } from '../../graphs/predefined-graph-options/median-list-price';
import { medianSaleGraphData } from '../../graphs/predefined-graph-options/median-sale-price';
import * as utils from './utilities';
import * as cnst from './constants';

const initialState: GraphState = {
  graphs: [],
  initiatives: {
    [cnst.INDUSTRY]: [statsOfBusinessGraphData, defenseGraphData],
    [cnst.DEMOGRAPHICS]: [
      wagesGraphData,
      medianIncomeGraphData,
      incomeInequalityGraphData
    ],
    [cnst.ASSETS]: [milesTraveledGraphData, airportsGraphData],
    [cnst.EDUCATION]: [highschoolGraphData, collegeGraphData],
    [cnst.HOUSING]: [medianListGraphData, medianSaleGraphData]
  },
  isEditting: false
};

export function graphReducer(
  state = initialState,
  action: GraphActionTypes
): GraphState {
  switch (action.type) {
    case cnst.ADD_GRAPH:
      return {
        ...state,
        graphs: [...utils.graphWithIds([action.payload]), ...state.graphs]
      };
    case cnst.ADD_LIST_OF_GRAPHS:
      return {
        ...state,
        graphs: [...utils.graphWithIds(action.payload), ...state.graphs]
      };
    case cnst.ADD_GRAPH_FOR_INITIATIVE:
      return {
        ...state,
        graphs: [
          ...utils.graphWithIds(
            utils.getGraphsForInitiative(action.payload, state.initiatives)
          ),
          ...state.graphs
        ]
      };
    case cnst.ADD_GRAPH_WITH_TITLE:
      return {
        ...state,
        graphs: [
          ...utils.getGraphWithTitle(action.payload, state.initiatives),
          ...state.graphs
        ]
      };
    case cnst.DUPLICATE_GRAPH:
      return {
        ...state,
        graphs: [
          ...utils.getDuplicateGraph(action.payload, state.graphs),
          ...state.graphs
        ]
      };
    case cnst.DELETE_GRAPH:
      return {
        ...state,
        graphs: [...utils.getGraphsWithout(action.payload, state.graphs)]
      };
    case cnst.EDITTING:
      return {
        ...state,
        isEditting: action.payload
      };
    default:
      return state;
  }
}
