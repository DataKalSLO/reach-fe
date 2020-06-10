import { GraphMetaData } from '../redux/graphs/types';
import { Story } from '../redux/story/types';

export type Content = GraphMetaData | Story;
export type ContentList = Content[];
