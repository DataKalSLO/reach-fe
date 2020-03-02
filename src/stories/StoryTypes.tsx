import React, { useState } from 'react';
import uuidv4 from 'uuid/v4';
import RichTextEditor from './RichTextEditor';
import { EditorState } from 'draft-js';
import { saveStoryToDatabase } from './StoryAPIConnector';

const existingUserID = '51d73193-470d-442b-a392-3e43238eb089'; //TODO: Remove when accounts implemented

export interface Story {
  id: string;
  userID: string;
  title: string;
  description: string;
  storyBlocks: Array<StoryBlock>;
}

export type StoryBlockType = 'Text' | 'Graph';

export interface StoryBlock {
  id: string;
  type: StoryBlockType;
}

export interface TextBlock extends StoryBlock {
  editorState: EditorState;
}

export interface GraphBlock extends StoryBlock {
  graphID: string;
}

export interface BlockComponent {
  component: JSX.Element;
  key: string;
  storyBlock: StoryBlock;
}

// Action Types
//
// Action was created as the union of three objects
// because TypeScript will create automatic type guards
// (https://www.sumologic.com/blog/react-hook-typescript/)
export const UPDATE_TEXT_BLOCK = 'UPDATE_TEXT_BLOCK';
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const CHANGE_BLOCKS = 'CHANGE_BLOCKS';

export type Action =
  | { type: typeof UPDATE_TITLE }
  | {
      type: typeof UPDATE_TEXT_BLOCK;
      payload: { index: number; editorState: EditorState };
    }
  | {
      type: typeof CHANGE_BLOCKS;
      payload: { newBlocks: Array<StoryBlock> };
    };

export function GenerateEmptyStory(userID: string): Story {
  return {
    id: uuidv4(),
    userID: existingUserID, //user in database (constant while in dev)
    title: 'test title',
    description: 'test description',
    storyBlocks: [] as Array<StoryBlock>
  };
}

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

export const SampleStory: Story = {
  id: uuidv4(),
  userID: existingUserID,
  title: 'Sample Title',
  description: 'Sample description',
  storyBlocks: SampleBlockComponents
};

export function SaveStory(story: Story) {
  alert(JSON.stringify(story.storyBlocks, null, 2));
  saveStoryToDatabase(story)
    .then(res => {
      console.log('Story Created!');
      console.log(res);
    })
    .catch(e => console.log(e[0]['details']));
}
