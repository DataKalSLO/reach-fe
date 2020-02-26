import React, { useState } from 'react';
import uuidv4 from 'uuid/v4';
import { Story } from './StoryTypes';

interface StoryDB {
  StoryID: string;
  UserID: string;
  Title: string;
  Description: string;
  DateCreated: string;
  DateLastEdited: string;
}

interface StoryBlockDB {
  StoryID: string;
  BlockID: string;
  Position: number;
}

interface BlockDB {
  BlockID: string;
}

interface TextBlockDB extends BlockDB {
  EditorState: JSON;
}

interface GraphBlockDB extends BlockDB {
  XAxis: string;
  YAxis: string;
}

function GenerateEmptyStory(userID: string): StoryDB {
  return {
    StoryID: uuidv4(),
    UserID: userID,
    Title: '',
    Description: '',
    DateCreated: Date.now.toString(),
    DateLastEdited: Date.now.toString()
  };
}

export const SampleStory: StoryDB = {
  StoryID: uuidv4(),
  UserID: uuidv4(),
  Title: 'Sample title',
  Description: 'Sample description',
  DateCreated: Date.now.toString(),
  DateLastEdited: Date.now.toString()
};

export function SaveStory(story: Story) {
  const storyDB = {
    StoryID: story.storyID,
    UserID: story.userID,
    Title: story.title,
    Description: story.description,
    DateCreated: story.dateCreated,
    DateLastEdited: story.dateLastEdited
  } as StoryDB;

  const storyBlocks: Array<StoryBlockDB> = [];

  return story;
}
