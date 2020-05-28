import { GraphRecord } from '../../redux/graphs/types';
import { Graph } from '../../redux/graphbuilder/types';

export interface GraphHeaderProps {
  graph: Graph;
  index: number;
  isHidden: boolean;
  toggleEdit: () => void;
  toggleHide: () => void;
}

export interface GraphPrebuiltProps {
  graph: Graph;
  index: number;
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
