import { EditorState } from 'draft-js';

export interface Story {
  id: string;
  userID: string;
  title: string;
  description: string;
  storyBlocks: Array<StoryBlock>;
}

export const TEXT_BLOCK = 'Text';
export const GRAPH_BLOCK = 'Graph';
export const MAP_BLOCK = 'Map';
type StoryBlockType = typeof TEXT_BLOCK | typeof GRAPH_BLOCK | typeof MAP_BLOCK;

export interface StoryBlock {
  id: string;
  type: StoryBlockType;
}

export interface TextBlock extends StoryBlock {
  editorState: EditorState;
}

export interface GraphBlock extends StoryBlock {
  xAxis: string;
  yAxis: string;
}

export interface BlockComponent {
  component: JSX.Element;
  key: string;
  storyBlock: StoryBlock;
}
