import { Graph, GraphMetaDataApiPayload } from '../../redux/graphbuilder/types';
import { GraphRecord } from '../../redux/graphs/types';

export interface GraphHeaderProps {
  graph: Graph;
  index: number;
}

export interface GraphPrebuiltProps {
  graph: Graph;
  index: number;
}

export interface GraphToolbarProps {
  graph: Graph;
  category: string;
  graphSVG: string;
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
