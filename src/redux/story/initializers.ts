import { uuid } from 'uuidv4';
import { GRAPH_NOT_SELECTED } from '../../stories/graph-block/GraphBlock';
import { emptyEditorState } from '../../stories/text-block/RichTextEditor';
import {
  GraphBlockType,
  GRAPH_BLOCK_TYPE,
  PublicationStatus,
  Story,
  StoryBlockType,
  TextBlockType,
  TEXT_BLOCK_TYPE
} from './types';

export const emptyTextBlock = (): TextBlockType => ({
  id: uuid(),
  editorState: emptyEditorState(),
  type: TEXT_BLOCK_TYPE
});

export const emptyGraphBlock = (): GraphBlockType => ({
  id: uuid(),
  graphID: GRAPH_NOT_SELECTED,
  type: GRAPH_BLOCK_TYPE
});

//TODO: Turn this into a function. Currently will stay same for every new story created in the same session.
export const initialStory: Story = {
  id: uuid(),
  userID: '',
  title: '',
  description: '',
  publicationStatus: PublicationStatus.DRAFT,
  storyBlocks: [emptyTextBlock()] as Array<StoryBlockType>
};
