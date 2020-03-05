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
export type StoryBlockType =
  | typeof TEXT_BLOCK
  | typeof GRAPH_BLOCK
  | typeof MAP_BLOCK;

export interface StoryBlock {
  id: string;
  type: StoryBlockType;
}

export interface TextBlock extends StoryBlock {
  editorState: EditorState;
}

//"Stubs" of what the graph and map properties may look like
export interface GraphBlockStub extends StoryBlock {
  xAxis: string;
  yAxis: string;
  graphType: string;
}

export interface MapBlockStub extends StoryBlock {
  center: {
    lat: number;
    long: number;
  };
  layers: Array<string>;
  date: string;
}
