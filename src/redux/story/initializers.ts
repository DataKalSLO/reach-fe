import { uuid } from 'uuidv4';
import { GRAPH_NOT_SELECTED } from '../../stories/graph-block/GraphBlock';
import { emptyEditorState } from '../../stories/text-block/RichTextEditor';
import {
  GraphBlockType,
  GRAPH_BLOCK_TYPE,
  ImageBlockType,
  IMAGE_BLOCK_TYPE,
  PublicationStatus,
  Story,
  StoryBlockType,
  TextBlockType,
  TEXT_BLOCK_TYPE
} from './types';

export const getEmptyTextBlock = (): TextBlockType => ({
  id: uuid(),
  editorState: emptyEditorState,
  type: TEXT_BLOCK_TYPE
});

export const getEmptyGraphBlock = (): GraphBlockType => ({
  id: uuid(),
  graphID: GRAPH_NOT_SELECTED,
  type: GRAPH_BLOCK_TYPE
});

export const getEmptyImageBlock = (): ImageBlockType => ({
  id: uuid(),
  imageUrl: '',
  type: IMAGE_BLOCK_TYPE
});

export const initialStory = (): Story => ({
  id: uuid(),
  userName: '',
  userId: '',
  title: '',
  description: '',
  publicationStatus: PublicationStatus.DRAFT,
  storyBlocks: [getEmptyTextBlock()] as Array<StoryBlockType>,
  dateCreated: new Date(),
  dateLastEdited: new Date()
});
