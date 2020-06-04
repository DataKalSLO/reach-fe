import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ADMIN_USER, STORY_VIEW } from '../../nav/constants';
import { getUser } from '../../redux/login/selectors';
import { PublicationStatus, Story } from '../../redux/story/types';
import { AuthorDate, Description, Title } from '../PreviewMetaData';
import { StyleProps, usePreviewCardStyles } from '../usePreviewCardStyles';
import AdminReviewCardActions from './AdminReviewCardActions';
import AuthorCardActions from './AuthorCardActions';

//TODO: Add a way to get author, date, and image url from passed in props
export const PLACEHOLDER_AUTHOR = 'Bill Writer';
export const PLACEHOLDER_USER_PICTURE = <AccountCircle />;
export const PLACEHOLDER_DATE = '1/1/20';
export const PLACEHOLDER_IMAGE_URL =
  'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.stack.imgur.com%2FLuPIV.png&f=1&nofb=1';

const styleProps: StyleProps = {
  minWidth: 250,
  maxWidth: 500
};

interface Props {
  story: Story;
}

export default function StoryCard(props: Props): JSX.Element {
  const user = useSelector(getUser);
  const history = useHistory();
  const classes = usePreviewCardStyles(styleProps);
  const [isVisible, setIsVisible] = useState(true);

  // Buttons to interact with a story that will only appear if current user is the author
  const AuthorButtons = (props: { story: Story }) => {
    if (user.email === props.story.userID) {
      return <AuthorCardActions story={props.story} />;
    } else {
      return <React.Fragment />;
    }
  };

  // Buttons to reject story with feedback or approve for publishing
  // Buttons will only appear if story is in review status and user is an admin
  const AdminReviewButtons = () => {
    if (
      user.role === ADMIN_USER &&
      props.story.publicationStatus === PublicationStatus.REVIEW
    ) {
      return (
        <>
          <Divider variant="middle" />
          <AdminReviewCardActions
            story={props.story}
            setCardVisible={setIsVisible}
          />
        </>
      );
    } else {
      return <React.Fragment />;
    }
  };

  if (!isVisible) {
    return <React.Fragment />;
  }

  return (
    <Card className={classes.card} variant="outlined">
      <AuthorButtons story={props.story} />

      <CardActionArea
        onClick={() => history.push(STORY_VIEW + '/' + props.story.id)}
      >
        <CardMedia
          className={classes.media}
          image={PLACEHOLDER_IMAGE_URL}
          title={props.story.title}
        />
        <CardContent>
          <Title text={props.story.title} />
          <Description text={props.story.description} />
          <AuthorDate
            name={PLACEHOLDER_AUTHOR}
            profilePicture={PLACEHOLDER_USER_PICTURE}
            date={PLACEHOLDER_DATE}
          />
        </CardContent>
      </CardActionArea>

      <AdminReviewButtons />
    </Card>
  );
}
