import { uuid } from 'uuidv4';
import { GRAPH_NOT_SELECTED } from '../../stories/graph-block/GraphBlock';
import { emptyEditorState } from '../../stories/text-block/RichTextEditor';
import {
  GraphBlockType,
  GRAPH_BLOCK_TYPE,
  TextBlockType,
  TEXT_BLOCK_TYPE
} from './types';

export const getEmptyTextBlock = (): TextBlockType => ({
  id: uuid(),
  editorState: emptyEditorState(),
  type: TEXT_BLOCK_TYPE
});

export const getEmptyGraphBlock = (): GraphBlockType => ({
  id: uuid(),
  graphID: GRAPH_NOT_SELECTED,
  type: GRAPH_BLOCK_TYPE
});
