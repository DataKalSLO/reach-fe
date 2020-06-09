import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { STORY_VIEW } from '../../nav/constants';
import { Story } from '../../redux/story/types';
import { AuthorDate, Description, Title } from '../PreviewMetaData';
import { StyleProps, usePreviewCardStyles } from '../usePreviewCardStyles';
import AdminReviewCardActions from './AdminReviewCardActions';
import AuthorCardActions from './AuthorCardActions';

//TODO: Add a way to get author, date, and image url from passed in props
export const PLACEHOLDER_AUTHOR = 'Bill Writer';
export const PLACEHOLDER_USER_PICTURE = <AccountCircle />;
export const PLACEHOLDER_IMAGE_URL =
  'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.stack.imgur.com%2FLuPIV.png&f=1&nofb=1';

const styleProps: StyleProps = {
  minWidth: 250,
  maxWidth: 500
};

interface Props {
  story: Story;
  showAuthorActions?: boolean;
  showAdminActions?: boolean;
}

export default function StoryCard(props: Props): JSX.Element {
  const history = useHistory();
  const classes = usePreviewCardStyles(styleProps);
  const [isVisible, setIsVisible] = useState(true);

  const AuthorButtons = () => {
    if (props.showAuthorActions) {
      return (
        <AuthorCardActions story={props.story} setCardVisible={setIsVisible} />
      );
    } else {
      return <React.Fragment />;
    }
  };

  // Buttons to reject story with feedback or approve for publishing
  // Buttons will only appear if story is in review status and user is an admin
  const AdminReviewButtons = () => {
    if (props.showAdminActions) {
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
      <AuthorButtons />

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
            name={props.story.userName}
            profilePicture={PLACEHOLDER_USER_PICTURE}
            date={props.story.dateLastEdited}
          />
        </CardContent>
      </CardActionArea>

      <AdminReviewButtons />
    </Card>
  );
}
