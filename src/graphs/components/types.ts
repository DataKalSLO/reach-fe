import { GraphRecord } from '../../redux/graphs/types';

export interface GraphHeaderProps {
  graph: GraphRecord;
}

export interface GraphPrebuiltProps {
  graph: GraphRecord;
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
