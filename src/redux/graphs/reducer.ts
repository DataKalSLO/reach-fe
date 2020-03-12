import { GraphState, GraphActionTypes } from './types';
import { defenseOptions } from '../../graphs/predefined-graph-options/dod-2018';
import { incomeInequalityOptions } from '../../graphs/predefined-graph-options/income-inequality';
import { wagesOptions } from '../../graphs/predefined-graph-options/real-mean-wages';
import { airportsOptions } from '../../graphs/predefined-graph-options/airports';
import { collegeGraduatesOptions } from '../../graphs/predefined-graph-options/college-graduates';
import { statsOfBusinessOptions } from '../../graphs/predefined-graph-options/state-of-business';
import { medianIncomeOptions } from '../../graphs/predefined-graph-options/median-income';
import { highschoolOptions } from '../../graphs/predefined-graph-options/percent-highschool';
import { milesTraveledOptions } from '../../graphs/predefined-graph-options/miles-traveled';
import { medianListOptions } from '../../graphs/predefined-graph-options/median-list-price';
import { medianSaleOptions } from '../../graphs/predefined-graph-options/median-sale-price';
import * as utils from './utilities';
import * as cnst from './constants';

const initialState: GraphState = {
  graphs: [],
  initiatives: {
    [cnst.INDUSTRY]: [statsOfBusinessOptions, defenseOptions],
    [cnst.DEMOGRAPHICS]: [
      wagesOptions,
      medianIncomeOptions,
      incomeInequalityOptions
    ],
    [cnst.ASSETS]: [milesTraveledOptions, airportsOptions],
    [cnst.EDUCATION]: [highschoolOptions, collegeGraduatesOptions],
    [cnst.HOUSING]: [medianSaleOptions, medianListOptions]
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
          )
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
