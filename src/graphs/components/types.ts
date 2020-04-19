import { GraphRecord } from '../../redux/graphs/types';

export interface GraphHeaderProps {
  graph: GraphRecord;
}

export interface GraphPrebuiltProps {
  graph: GraphRecord;
}

export interface InitiativeIcon {
  name: string;
  icon: JSX.Element;
}
