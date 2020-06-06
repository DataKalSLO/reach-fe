import { Box, Grid, styled, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import { DateFormatter } from '../common/util/dateFormatter';
import { DEFAULT_USER_NAME } from '../nav/constants';
import { getUser } from '../redux/login/selectors';
import {
  GraphBlockType,
  GRAPH_BLOCK_TYPE,
  ImageBlockType,
  IMAGE_BLOCK_TYPE,
  MapBlockType,
  MAP_BLOCK_TYPE,
  PublicationStatus,
  Story,
  StoryBlockType,
  TextBlockType,
  TEXT_BLOCK_TYPE
} from '../redux/story/types';
import AdminReviewActions from './AdminReviewActions';
import AdminReviewFeedback from './AdminReviewFeedback';
import StoryShareButton from './StoryShareButton';

export default function StoryView(props: { story: Story }): JSX.Element {
  const user = useSelector(getUser);

  const TitleDescription = (props: { story: Story }) => {
    return (
      <TitleBox>
        <WrappingTypography variant="h3">
          {props.story.title}
        </WrappingTypography>
        <WrappingTypography variant="subtitle1">
          {props.story.description}
        </WrappingTypography>
      </TitleBox>
    );
  };

  const createPublicationDateString = (story: Story) => {
    let name: string;
    if (props.story.userName !== '') {
      name = props.story.userName;
    } else {
      // If there is no username associated with a story, then we are in StoryBuilder preview mode
      // Use the current user's name if they are logged in or a default name if not
      name = user.name !== '' ? user.name : DEFAULT_USER_NAME;
    }
    return `By ${name} on ${new DateFormatter(
      props.story.dateLastEdited
    ).toEnglishDateString()}`;
  };

  const ShareButton = (props: { story: Story }) => {
    return props.story.publicationStatus === PublicationStatus.PUBLISHED ? (
      <Grid item xs={1}>
        <StoryShareButton
          shareURL={window.location.toString()}
          storyTitle={props.story.title}
        />
      </Grid>
    ) : (
      <React.Fragment />
    );
  };

  return (
    <StyledGrid>
      <Grid
        container
        item
        direction="row"
        alignItems="flex-start"
        justify="space-between"
        wrap="nowrap"
      >
        <Grid item>
          <TitleDescription story={props.story} />
        </Grid>
        <ShareButton story={props.story} />
      </Grid>

      <AuthorGrid
        container
        item
        direction="row"
        alignContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          {/* TODO: use user's profile picture or delete this */}
          <AccountCircleIcon fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">
            {createPublicationDateString(props.story)}
          </Typography>
        </Grid>
      </AuthorGrid>

      <AdminReviewFeedback story={props.story} user={user} />

      {props.story.storyBlocks.map(block => convertBlockToJSX(block))}

      <AdminReviewActions story={props.story} user={user} />
    </StyledGrid>
  );
}

function convertBlockToJSX(storyBlock: StoryBlockType): JSX.Element {
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

const StyledGrid = styled(Grid)({
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
