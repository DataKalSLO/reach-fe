import { Box, Grid, styled, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from 'react';
import { useSelector } from 'react-redux';
import { DateFormatter } from '../common/util/dateFormatter';
import { DEFAULT_USER_NAME } from '../nav/constants';
import { getUser } from '../redux/login/selectors';
import { PublicationStatus, Story } from '../redux/story/types';
import AdminReviewActions from './AdminReviewActions';
import AdminReviewFeedback from './AdminReviewFeedback';
import { convertBlockToJSX } from './convertBlockToJSX';
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
