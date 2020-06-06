import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  GraphBlockType,
  GRAPH_BLOCK_TYPE,
  ImageBlockType,
  IMAGE_BLOCK_TYPE,
  MapBlockType,
  MAP_BLOCK_TYPE,
  StoryBlockType,
  TextBlockType,
  TEXT_BLOCK_TYPE
} from '../redux/story/types';

export function convertBlockToJSX(storyBlock: StoryBlockType): JSX.Element {
  switch (storyBlock.type) {
    case TEXT_BLOCK_TYPE:
      return convertTextBlockToJSX(storyBlock);
    case GRAPH_BLOCK_TYPE:
      return convertGraphBlockToJSX(storyBlock);
    case IMAGE_BLOCK_TYPE:
      return convertImageBlockToJSX(storyBlock);
    case MAP_BLOCK_TYPE:
      return convertMapBlockToJSX(storyBlock);
  }
}

function convertTextBlockToJSX(textBlock: TextBlockType): JSX.Element {
  const rawContentState = convertToRaw(
    textBlock.editorState.getCurrentContent()
  );
  const markup = draftToHtml(rawContentState);
  return <div key={textBlock.id}> {ReactHtmlParser(markup)} </div>;
}

function convertGraphBlockToJSX(graphBlock: GraphBlockType): JSX.Element {
  return (
    <div key={graphBlock.id}>Graph Block conversion not yet implemented</div>
  );
}

function convertImageBlockToJSX(imageBlock: ImageBlockType): JSX.Element {
  if (imageBlock.imageUrl !== '') {
    return (
      <div key={imageBlock.id}>
        <img src={imageBlock.imageUrl} alt={'Story Preview'} />
      </div>
    );
  }
  return <div> Empty Image Block </div>;
}

function convertMapBlockToJSX(mapBlock: MapBlockType): JSX.Element {
  return <div key={mapBlock.id}>Map Block conversion not yet implemented</div>;
}
