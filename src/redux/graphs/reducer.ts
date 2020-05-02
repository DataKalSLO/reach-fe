import * as prebuilt from '../../graphs/prebuilt-graph-options/prebuilt-options';
import * as consts from './constants';
import { GraphActionTypes, GraphState } from './types';
import * as utils from './utilities';

const initialState: GraphState = {
  graphs: [],
  initiatives: {
    [consts.INDUSTRY]: [
      prebuilt.statsOfBusinessGraphOptions,
      prebuilt.defenseGraphOptions,
      prebuilt.dodGraphOptions
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
    [consts.HEALTH]: [
      prebuilt.covidCasesGraphOptions,
      prebuilt.SBCovidCasesGraphOptions,
      prebuilt.covidCasesByStatusGraphOptions,
      prebuilt.SBCovidCasesByStatusGraphOptions,
      prebuilt.covidCasesByCityGraphOptions,
      prebuilt.SBCovidCasesBycityGraphOptions,
      prebuilt.covidCasesByAgeGraphOptions,
      prebuilt.SBCovidCasesByAgeGraphOptions,
      prebuilt.HealthCareFacityBedGraphOptions,
      prebuilt.SBHealthCareFacityBedGraphOptions,
      prebuilt.covidCasesByRegionGraphOptions,
      prebuilt.unemploymentInsuranceClaimGraphOption
    ]
  }
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
    default:
      return state;
  }
}
