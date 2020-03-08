import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import ReactHtmlParser from 'react-html-parser';
import React from 'react';
import {
  Story,
  StoryBlock,
  TEXT_BLOCK_TYPE,
  TextBlock,
  GraphBlock,
  GRAPH_BLOCK_TYPE,
  MapBlock,
  MAP_BLOCK_TYPE
} from './StoryTypes';
import { Typography } from '@material-ui/core';

export function storyAsJSX(story: Story): JSX.Element {
  return (
    <div>
      <Typography variant="h1">{story.title}</Typography>
      <Typography variant="subtitle1">{story.description}</Typography>
      {story.storyBlocks.map(block => blockAsJSX(block))}
    </div>
  );
}

function blockAsJSX(storyBlock: StoryBlock): JSX.Element {
  switch (storyBlock.type) {
    case TEXT_BLOCK_TYPE:
      return textBlockAsJSX(storyBlock);
    case GRAPH_BLOCK_TYPE:
      return graphBlockAsJSX(storyBlock);
    case MAP_BLOCK_TYPE:
      return mapBlockAsJSX(storyBlock);
  }
}

function textBlockAsJSX(textBlock: TextBlock): JSX.Element {
  const rawContentState = convertToRaw(
    textBlock.editorState.getCurrentContent()
  );
  const markup = draftToHtml(rawContentState);
  return <div> {ReactHtmlParser(markup)} </div>;
}

function graphBlockAsJSX(graphBlock: GraphBlock): JSX.Element {
  return <div>Graph Block conversion not yet implemented</div>;
}

function mapBlockAsJSX(mapBlock: MapBlock): JSX.Element {
  return <div>Map Block conversion not yet implemented</div>;
}
