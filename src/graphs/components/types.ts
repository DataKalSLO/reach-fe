import { GraphRecord } from '../../redux/graphs/types';
import { Graph } from '../../redux/graphbuilder/types';

export interface GraphHeaderProps {
  graph: GraphRecord;
}

export interface GraphPrebuiltProps {
  graph: Graph;
}

export interface GraphProps {
  graphRecord: GraphRecord;
}

export interface AccessorProps {
  id: string;
}

export interface InitiativeIcon {
  name: string;
  icon: JSX.Element;
}
