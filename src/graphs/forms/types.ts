import Graph from '../builder/graph';

export interface GraphHeaderProps {
  graphId: string;
}

export interface EditFormProps {
  graphs: Graph[];
}

export interface EditFormState {
  title: string;
  gridLines: boolean;
  edittingSeries: EditSeriesState[];
}

export interface EditSeriesState {
  seriesName: string;
  seriesColor: string;
  type: string;
  possibleTypes: string[];
}
