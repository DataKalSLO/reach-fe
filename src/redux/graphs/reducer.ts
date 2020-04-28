import { GraphState, GraphActionTypes } from './types';
import * as prebuilt from '../../graphs/prebuilt-graph-options/prebuilt-options';
import * as consts from './constants';
import * as utils from './utilities';

const initialState: GraphState = {
  graphs: [],
  initiatives: {
    [consts.INDUSTRY]: [
      prebuilt.statsOfBusinessGraphOptions,
      prebuilt.defenseGraphOptions
    ],
    [consts.DEMOGRAPHICS]: [
      prebuilt.wagesGraphOptions,
      prebuilt.medianIncomeGraphOptions,
      prebuilt.incomeInequalityGraphOptions
    ],
    [consts.ASSETS]: [
      prebuilt.milesTraveledGraphOptions,
      prebuilt.airportsGraphOptions
    ],
    [consts.EDUCATION]: [
      prebuilt.highschoolGraphOptions,
      prebuilt.collegeGraduatesGraphOptions
    ],
    [consts.HOUSING]: [
      prebuilt.medianSaleGraphOptions,
      prebuilt.medianListGraphOptions
    ],
    [consts.HEALTH]:[
      prebuilt.unemploymentInsuranceClaimGraphOption,
      prebuilt.covidCasesGraphOptions,
      prebuilt.covidCasesByStatusGraphOptions,
      prebuilt.covidCasesByCityGraphOptions
    ]
  },
  isEditing: false
};

export function graphReducer(
  state = initialState,
  action: GraphActionTypes
): GraphState {
  switch (action.type) {
    // replaces any pre-existing graphs (this will probably change)
    case consts.ADD_GRAPH_FOR_INITIATIVE:
      return {
        ...state,
        graphs: utils.getGraphWithIds(
          utils.getGraphsForInitiative(action.payload, state.initiatives)
        )
      };
    case consts.DUPLICATE_GRAPH:
      return {
        ...state,
        graphs: utils.addDuplicateToGraphs(action.payload, state.graphs)
      };
    case consts.DELETE_GRAPH:
      return {
        ...state,
        graphs: utils.getGraphsWithout(action.payload, state.graphs)
      };
    case consts.EDITING_GRAPH:
      return {
        ...state,
        isEditing: !state.isEditing
      };
    default:
      return state;
  }
}
