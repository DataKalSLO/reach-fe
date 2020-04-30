import { GraphRecord } from '../../redux/graphs/types';
import HighchartsReact from 'highcharts-react-official';

export interface GraphHeaderProps {
  graph: GraphRecord;
}

export interface GraphPrebuiltProps {
  graph: GraphRecord;
}

export type GraphRef =
  | string
  | ((instance: HighchartsReact | null) => void)
  | React.RefObject<HighchartsReact>
  | null
  | undefined;

export interface GraphProps {
  graphRecord: Omit<GraphRecord, 'isEditing'>;
  ref:
    | string
    | ((instance: HighchartsReact | null) => void)
    | React.RefObject<HighchartsReact>
    | null
    | undefined;
}

export interface AccessorProps {
  id: string;
}

export interface InitiativeIcon {
  name: string;
  icon: JSX.Element;
}
