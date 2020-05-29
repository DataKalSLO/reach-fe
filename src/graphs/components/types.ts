import { Graph } from '../../redux/graphbuilder/types';
import { GraphRecord } from '../../redux/graphs/types';

export interface GraphToolbarProps {
  graph: Graph;
  index: number;
  isHidden: boolean;
  graphSVG: string;
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
