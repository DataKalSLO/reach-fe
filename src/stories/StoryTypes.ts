import uuidv4 from 'uuid/v4';
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

// FIXME: @kevin is this for reference?
export const SampleBlockComponents: Array<StoryBlock> = [
  {
    id: 'id1',
    editorState: JSON.parse('{}')
  } as TextBlock,
  {
    id: 'id2',
    editorState: JSON.parse('{}')
  } as TextBlock
] as Array<StoryBlock>;

// FIXME: @kevin is this for reference?
export const SampleStory: Story = {
  id: uuidv4(),
  userID: uuidv4(),
  title: 'Sample Title',
  description: 'Sample description',
  storyBlocks: SampleBlockComponents
};
