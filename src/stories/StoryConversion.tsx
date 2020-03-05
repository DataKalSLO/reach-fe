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

export function storyToHTML(story: Story): JSX.Element {
  return <div>{story.storyBlocks.map(block => blockToHTML(block))}</div>;
}

function blockToHTML(storyBlock: StoryBlock): JSX.Element {
  switch (storyBlock.type) {
    case TEXT_BLOCK_TYPE:
      return textBlockToHTML(storyBlock);
    case GRAPH_BLOCK_TYPE:
      return graphBlockToHTML(storyBlock);
    case MAP_BLOCK_TYPE:
      return mapBlockToHTML(storyBlock);
  }
}

function textBlockToHTML(textBlock: TextBlock): JSX.Element {
  const rawContentState = convertToRaw(
    textBlock.editorState.getCurrentContent()
  );
  const markup = draftToHtml(rawContentState);
  return <div> {ReactHtmlParser(markup)} </div>;
}

function graphBlockToHTML(graphBlock: GraphBlock): JSX.Element {
  return <div>Graph Block conversion not yet implemented</div>;
}

function mapBlockToHTML(mapBlock: MapBlock): JSX.Element {
  return <div>Map Block conversion not yet implemented</div>;
}
