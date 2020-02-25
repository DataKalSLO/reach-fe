import React, { useState } from 'react';
import uuidv4 from 'uuid/v4';

export interface Story {
  StoryID: string;
  UserID: string;
  Title: string;
  Description: string;
  DateCreated: string;
  DateLastEdited: string;
  StoryBlocks: Array<StoryBlock>;
}

export interface StoryBlock {
  BlockID: string;
  Position: number;
  BlockValue: Block;
}

export interface Block {
  BlockID: string;
}

export interface TextBlock extends Block {
  EditorState: JSON;
}

export interface GraphBlock extends Block {
  XAxis: string;
  YAxis: string;
}

export function GenerateEmptyStory(userID: string): Story {
  return {
    StoryID: uuidv4(),
    UserID: userID,
    Title: '',
    Description: '',
    DateCreated: Date.now.toString(),
    DateLastEdited: Date.now.toString(),
    StoryBlocks: [] as Array<StoryBlock>
  };
}

export const SampleStory: Story = {
  StoryID: uuidv4(),
  UserID: uuidv4(),
  Title: 'Sample Title',
  Description: 'Sample description',
  DateCreated: Date.now.toString(),
  DateLastEdited: Date.now.toString(),
  StoryBlocks: [
    {
      BlockID: uuidv4(),
      Position: 0,
      BlockValue: {
        EditorState: JSON.parse('{ "editorState": "State"}')
      } as TextBlock
    } as StoryBlock
  ] as Array<StoryBlock>
};

export function SaveStory(story: Story) {
  alert(JSON.stringify(story, null, 2));
  return story;
}
