import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import ReactHtmlParser from 'react-html-parser';
import React from 'react';
import {
  Story,
  StoryBlock,
  TEXT_BLOCK,
  TextBlock,
  GraphBlockStub,
  GRAPH_BLOCK,
  MapBlockStub,
  MAP_BLOCK
} from './StoryTypes';

export function storyToHTML(story: Story): Array<JSX.Element> {
  return story.storyBlocks.map(block => blockToHTML(block));
}

function blockToHTML(storyBlock: StoryBlock): JSX.Element {
  switch (storyBlock.type) {
    case TEXT_BLOCK:
      return textBlockToHTML(storyBlock as TextBlock);
    case GRAPH_BLOCK:
      return graphBlockToHTML(storyBlock as GraphBlockStub);
    case MAP_BLOCK:
      return mapBlockToHTML(storyBlock as MapBlockStub);
    default:
      throw new Error('Block type does not exist: ' + storyBlock.type);
  }
}

function textBlockToHTML(textBlock: TextBlock): JSX.Element {
  const rawContentState = convertToRaw(
    textBlock.editorState.getCurrentContent()
  );
  const markup = draftToHtml(rawContentState);
  return <div> {ReactHtmlParser(markup)} </div>;
}

function graphBlockToHTML(graphBlock: GraphBlockStub): JSX.Element {
  return <div>Graph Block conversion not yet implemented</div>;
}

function mapBlockToHTML(mapBlock: MapBlockStub): JSX.Element {
  return <div>Map Block conversion not yet implemented</div>;
}
