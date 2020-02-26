import React, { useState } from 'react';
import uuidv4 from 'uuid/v4';
import RichTextEditor from './RichTextEditor';

export interface Story {
  storyID: string;
  userID: string;
  title: string;
  description: string;
  dateCreated: string;
  dateLastEdited: string;
  storyBlocks: Array<StoryBlock>;
}

export interface StoryBlock {
  blockID: string;
  type: 'Text' | 'Graph';
}

export interface TextBlock extends StoryBlock {
  editorState: JSON;
  type: 'Text';
}

export interface GraphBlock extends StoryBlock {
  xAxis: string;
  yAxis: string;
  type: 'Graph';
}

export interface BlockComponent {
  component: JSX.Element;
  key: string;
  storyBlock: StoryBlock;
}

export function GenerateEmptyStory(userID: string): Story {
  return {
    storyID: uuidv4(),
    userID: userID,
    title: '',
    description: '',
    dateCreated: Date.now.toString(),
    dateLastEdited: Date.now.toString(),
    storyBlocks: [] as Array<StoryBlock>
  };
}

export const SampleBlockComponents: Array<StoryBlock> = [
  {
    blockID: 'id1',
    editorState: JSON.parse('{}')
  } as TextBlock,
  {
    blockID: 'id2',
    editorState: JSON.parse('{}')
  } as TextBlock
] as Array<StoryBlock>;

export const SampleStory: Story = {
  storyID: uuidv4(),
  userID: uuidv4(),
  title: 'Sample Title',
  description: 'Sample description',
  dateCreated: Date.now.toString(),
  dateLastEdited: Date.now.toString(),
  storyBlocks: SampleBlockComponents
};

export function SaveStory(story: Story) {
  alert(JSON.stringify(story, null, 2));
  return story;
}
