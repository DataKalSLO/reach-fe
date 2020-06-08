import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { isUndefined } from 'util';
import { getGraphAndHandleResponse } from '../api/graphs/operationHandlers';
import { CoreGraph } from '../graphs/components/CoreGraph';
import { createGraphWithData } from '../redux/graphbuilder/actions';
import { Graph } from '../redux/graphbuilder/types';
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
      return <TextBlockView textBlock={storyBlock} />;
    case GRAPH_BLOCK_TYPE:
      return <GraphBlockView graphBlock={storyBlock} />;
    case IMAGE_BLOCK_TYPE:
      return <ImageBlockView imageBlock={storyBlock} />;
    case MAP_BLOCK_TYPE:
      return <MapBlockView mapBlock={storyBlock} />;
  }
}

function TextBlockView(props: { textBlock: TextBlockType }): JSX.Element {
  const rawContentState = convertToRaw(
    props.textBlock.editorState.getCurrentContent()
  );
  const markup = draftToHtml(rawContentState);
  return <div key={props.textBlock.id}> {ReactHtmlParser(markup)} </div>;
}

function GraphBlockView(props: { graphBlock: GraphBlockType }): JSX.Element {
  const [interactiveGraph, setInteractiveGraph] = useState<Graph | undefined>(
    undefined
  );

  useEffect(() => {
    getGraphAndHandleResponse(props.graphBlock.graphID).then(graphMetaData => {
      createGraphWithData(graphMetaData).then(graph => {
        setInteractiveGraph(graph);
      });
    });
  }, [props.graphBlock.graphID]);

  return isUndefined(interactiveGraph) ? (
    <div>Loading Graph...</div>
  ) : (
    <CoreGraph graph={interactiveGraph} />
  );
}

function ImageBlockView(props: { imageBlock: ImageBlockType }): JSX.Element {
  if (props.imageBlock.imageUrl !== '') {
    return (
      <div key={props.imageBlock.id}>
        <img src={props.imageBlock.imageUrl} alt={'Story Preview'} />
      </div>
    );
  }
  return <div> Empty Image Block </div>;
}

function MapBlockView(props: { mapBlock: MapBlockType }): JSX.Element {
  return (
    <div key={props.mapBlock.id}>Map Block conversion not yet implemented</div>
  );
}
