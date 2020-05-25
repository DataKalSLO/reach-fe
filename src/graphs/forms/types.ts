import { Graph } from '../../redux/graphbuilder/types';

export interface GraphFormProps {
  graph: Graph;
  index: number;
}

export interface FormProps {
  graph: Graph;
  index: number;
  handleCancel: (index: number) => void;
  handleUpdate: (graph: Graph) => void;
}

export interface GraphDataFormState {
  datasetName: string;
  xAxisColumnName: string;
  yAxisColumnNames: string[];
}

export interface DatasetsMetaData {
  datasetNames: string[];
  xAxisColumnNames: {
    [dataset: string]: string[];
  };
  yAxisColumnNames: {
    [dataset: string]: string[];
  };
}
