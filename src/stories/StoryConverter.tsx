import { Box, Grid, styled, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  GraphBlockType,
  GRAPH_BLOCK_TYPE,
  MapBlockType,
  MAP_BLOCK_TYPE,
  StoryBlockType,
  TextBlockType,
  TEXT_BLOCK_TYPE
} from '../redux/story/types';
import { Story } from '../redux/story/types';

export function convertStoryToJSX(story: Story): JSX.Element {
  const createPublicationDateString = () => {
    // FIXME: should pull the user's name
    const username = 'Business Owner';
    return `By ${username} on ${new Date().toDateString()}`;
  };

  return (
    <StyledBox>
      <TitleBox>
        <WrappingTypography variant="h3">{story.title}</WrappingTypography>
        <WrappingTypography variant="subtitle1">
          {story.description}
        </WrappingTypography>
      </TitleBox>

      <AuthorGrid
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
      </AuthorGrid>

      {/* TODO: add backgrounds to rich text editors so they don't peek through when dragged over each other */}
      {/* TODO: add bounding box so blocks cannot be dragged out of sortable area */}
      {story.storyBlocks.map(block => convertBlockToJSX(block))}
    </StyledBox>
  );
}

function convertBlockToJSX(storyBlock: StoryBlockType): JSX.Element {
  switch (storyBlock.type) {
    case TEXT_BLOCK_TYPE:
      return convertTextBlockToJSX(storyBlock);
    case GRAPH_BLOCK_TYPE:
      return convertGraphBlockToJSX(storyBlock);
    case MAP_BLOCK_TYPE:
      return convertMapBlockToJSX(storyBlock);
  }
}

function convertTextBlockToJSX(textBlock: TextBlockType): JSX.Element {
  const rawContentState = convertToRaw(
    textBlock.editorState.getCurrentContent()
  );
  const markup = draftToHtml(rawContentState);
  return <div> {ReactHtmlParser(markup)} </div>;
}

function convertGraphBlockToJSX(graphBlock: GraphBlockType): JSX.Element {
  return <div>Graph Block conversion not yet implemented</div>;
}

function convertMapBlockToJSX(mapBlock: MapBlockType): JSX.Element {
  return <div>Map Block conversion not yet implemented</div>;
}

const StyledBox = styled(Box)({
  margin: '20px 10px 20px 10px'
});

const TitleBox = styled(Box)({
  paddingBottom: '10px'
});

const WrappingTypography = styled(Typography)({
  overflowWrap: 'break-word'
});

const AuthorGrid = styled(Grid)({
  marginTop: '5px',
  marginBottom: '5px'
});
