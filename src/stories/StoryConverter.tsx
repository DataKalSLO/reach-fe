import { Box, Grid, styled, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  GraphBlock,
  GRAPH_BLOCK_TYPE,
  MapBlock,
  MAP_BLOCK_TYPE,
  Story,
  StoryBlock,
  TextBlock,
  TEXT_BLOCK_TYPE
} from './StoryTypes';

export function convertStoryToJSX(story: Story): JSX.Element {
  const createPublicationDateString = () => {
    // FIXME: should pull the user's name
    const username = 'Kevin Krein';
    return `By ${username} on ${new Date().toDateString()}`;
  };

  return (
    <StyledBox>
      <StyledTitleBox>
        <Typography variant="h3">{story.title}</Typography>
        <Typography variant="subtitle1">{story.description}</Typography>
      </StyledTitleBox>

      <Grid
        container
        direction="row"
        alignContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <AccountCircleIcon fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">
            {createPublicationDateString()}
          </Typography>
        </Grid>
      </Grid>

      {story.storyBlocks.map(block => convertBlockToJSX(block))}
    </StyledBox>
  );
}

function convertBlockToJSX(storyBlock: StoryBlock): JSX.Element {
  switch (storyBlock.type) {
    case TEXT_BLOCK_TYPE:
      return convertTextBlockToJSX(storyBlock);
    case GRAPH_BLOCK_TYPE:
      return convertGraphBlockToJSX(storyBlock);
    case MAP_BLOCK_TYPE:
      return convertMapBlockToJSX(storyBlock);
  }
}

function convertTextBlockToJSX(textBlock: TextBlock): JSX.Element {
  const rawContentState = convertToRaw(
    textBlock.editorState.getCurrentContent()
  );
  const markup = draftToHtml(rawContentState);
  return <div> {ReactHtmlParser(markup)} </div>;
}

function convertGraphBlockToJSX(graphBlock: GraphBlock): JSX.Element {
  return <div>Graph Block conversion not yet implemented</div>;
}

function convertMapBlockToJSX(mapBlock: MapBlock): JSX.Element {
  return <div>Map Block conversion not yet implemented</div>;
}

const StyledBox = styled(Box)({
  margin: '20px 10px 20px 10px'
});

const StyledTitleBox = styled(Box)({
  paddingBottom: '10px'
});
