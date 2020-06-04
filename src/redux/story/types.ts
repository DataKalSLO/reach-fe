import { EditorState } from 'draft-js';

//Text block types
export const TEXT_BLOCK_TYPE = 'Text';
export const GRAPH_BLOCK_TYPE = 'Graph';
export const MAP_BLOCK_TYPE = 'Map';

//Action names
export const CREATE_EMPTY_TEXT_BLOCK = 'CREATE_EMPTY_TEXT_BLOCK';
export const CREATE_GRAPH_BLOCK = 'CREATE_GRAPH_BLOCK';
export const UPDATE_TEXT_BLOCK = 'UPDATE_TEXT_BLOCK';
export const UPDATE_GRAPH_BLOCK = 'UPDATE_GRAPH_BLOCK';
export const DELETE_BLOCK = 'DELETE_BLOCK';
export const SWAP_BLOCKS = 'SWAP_BLOCKS';
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
export const UPDATE_PUBLICATION_STATUS = 'UPDATE_PUBLICATION_STATUS';
export const LOAD_EXISTING_STORY = 'LOAD_EXISTING_STORY';

//Story
export enum PublicationStatus {
  DRAFT,
  REVIEW,
  FEEDBACK,
  PUBLISHED
}

export interface StoryMetaInformation {
  id: string;
  userName: string;
  userID: string;
  title: string;
  description: string;
  publicationStatus: PublicationStatus;
  dateCreated: Date;
  dateLastEdited: Date;
}

export interface Story extends StoryMetaInformation {
  storyBlocks: Array<StoryBlockType>;
}

//StoryBlocks
export interface TextBlockType {
  type: typeof TEXT_BLOCK_TYPE;
  id: string;
  editorState: EditorState;
}

export interface GraphBlockType {
  type: typeof GRAPH_BLOCK_TYPE;
  id: string;
  graphID: string;
}

export interface MapBlockType {
  type: typeof MAP_BLOCK_TYPE;
  id: string;
  mapID: string;
}

export type StoryBlockType = TextBlockType | GraphBlockType | MapBlockType;

//Actions
export interface CreateEmptyTextBlockAction {
  type: typeof CREATE_EMPTY_TEXT_BLOCK;
  payload: { block: TextBlockType };
}

export interface CreateGraphBlockAction {
  type: typeof CREATE_GRAPH_BLOCK;
  payload: { block: GraphBlockType };
}

export interface UpdateTextBlockAction {
  type: typeof UPDATE_TEXT_BLOCK;
  payload: { index: number; editorState: EditorState };
}

export interface UpdateGraphBlockAction {
  type: typeof UPDATE_GRAPH_BLOCK;
  payload: { index: number; graphID: string };
}

export interface DeleteBlockAction {
  type: typeof DELETE_BLOCK;
  payload: { index: number };
}

export interface SwapBlocksAction {
  type: typeof SWAP_BLOCKS;
  payload: { oldIndex: number; newIndex: number };
}

export interface UpdateTitleAction {
  type: typeof UPDATE_TITLE;
  payload: { newTitle: string };
}

export interface UpdateDescriptionAction {
  type: typeof UPDATE_DESCRIPTION;
  payload: { newDescription: string };
}

export interface UpdatePublicationStatusAction {
  type: typeof UPDATE_PUBLICATION_STATUS;
  payload: { newPublicationStatus: PublicationStatus };
}

export interface LoadExistingStoryAction {
  type: typeof LOAD_EXISTING_STORY;
  payload: { storyToLoad: Story };
}

// use in updateObjectInArray function (reducer.ts) when updating a single object.
// interfaces of this type must include:
//  - index
//  - <data-to-change>
export type UpdateBlockType = UpdateTextBlockAction | UpdateGraphBlockAction;

// used by reducer function (reducer.ts)
export type StoryActionType =
  | CreateEmptyTextBlockAction
  | CreateGraphBlockAction
  | UpdateTextBlockAction
  | UpdateGraphBlockAction
  | DeleteBlockAction
  | SwapBlocksAction
  | UpdateTitleAction
  | UpdateDescriptionAction
  | UpdatePublicationStatusAction
  | LoadExistingStoryAction;
