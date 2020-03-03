import { EditorState } from 'draft-js';

export interface Story {
  id: string;
  userID: string;
  title: string;
  description: string;
  storyBlocks: Array<StoryBlock>;
}

type StoryBlockType = 'Text' | 'Graph';

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
