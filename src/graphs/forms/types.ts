import {
  Graph,
  GraphMetaData,
  PartialGraphConfigurationWithoutData
} from '../../redux/graphbuilder/types';
import { SeriesConfiguration } from '../builder/types';
import { Metadata } from '../../redux/vizbuilder/types';

export interface GraphFormProps {
  graph: Graph;
  index: number;
}

export interface FormattingFormProps {
  state: PartialGraphConfigurationWithoutData;
  setState: React.Dispatch<
    React.SetStateAction<PartialGraphConfigurationWithoutData>
  >;
  children?: JSX.Element[] | JSX.Element;
}

export interface DataFormProps {
  metaData: Metadata[];
  dataState: GraphDataFormState;
  seriesState: SeriesConfiguration[];
  setDataState: React.Dispatch<React.SetStateAction<GraphDataFormState>>;
  setSeriesState: React.Dispatch<React.SetStateAction<SeriesConfiguration[]>>;
  children?: JSX.Element[] | JSX.Element;
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
