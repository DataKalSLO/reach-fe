import { GraphData } from '../components/types';

export const initiativesGraphData = {
  industry: {},
  demographics: {},
  assets: {},
  education: {},
  housing: {}
};

export interface InitiativesGraphData {
  industry: GraphData[];
  demographics: GraphData[];
  assets: GraphData[];
  education: GraphData[];
  housing: GraphData[];
}
