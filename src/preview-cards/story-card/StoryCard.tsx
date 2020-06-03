import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ADMIN_USER, STORY_VIEW } from '../../nav/constants';
import { getUser } from '../../redux/login/selectors';
import { PublicationStatus, Story } from '../../redux/story/types';
import AdminReviewCardActions from './AdminReviewCardActions';
import AuthorCardActions from './AuthorCardActions';

//TODO: Add a way to get author, date, and image url from passed in props
const PLACEHOLDER_AUTHOR = 'Bill Writer';
const PLACEHOLDER_USER_PICTURE = <AccountCircle />;
const PLACEHOLDER_DATE = '1/1/20';
const PLACEHOLDER_IMAGE_URL =
  'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.stack.imgur.com%2FLuPIV.png&f=1&nofb=1';

const useStyles = makeStyles({
  card: {
    width: '30%',
    minWidth: 250,
    maxWidth: 500,
    height: '20%',
    margin: 10,
    padding: 2,
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    paddingBottom: 0
  },
  media: {
    height: 0, // tells the image to resize dynamically based on paddingTop
    width: '100%',
    paddingTop: '60%' // controls the height of the image
  }
});

interface Props {
  story: Story;
}

export default function StoryCard(props: Props): JSX.Element {
  const user = useSelector(getUser);
  const history = useHistory();
  const classes = useStyles();

  const AuthorWithProfilePhoto = (props: {
    name: string;
    picture: JSX.Element;
  }) => {
    return (
      <React.Fragment>
        <Grid item>{props.picture}</Grid>
        <Grid item>
          <Typography variant="subtitle1" color="textSecondary">
            {props.name}
          </Typography>
        </Grid>
      </React.Fragment>
    );
  };

  const AuthorDate = () => {
    return (
      <Grid container item wrap="nowrap">
        <Grid container item alignItems="center" spacing={1}>
          <AuthorWithProfilePhoto
            name={PLACEHOLDER_AUTHOR}
            picture={PLACEHOLDER_USER_PICTURE}
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" color="textSecondary">
            {PLACEHOLDER_DATE}
          </Typography>
        </Grid>
      </Grid>
    );
  };

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
          <AdminReviewCardActions />
        </>
      );
    } else {
      return <React.Fragment />;
    }
  };

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
          <Typography gutterBottom variant="h6" component="h1">
            {props.story.title}
          </Typography>
          <Typography
            paragraph
            variant="body2"
            component="body"
            display="block"
          >
            {props.story.description}
          </Typography>
          <AuthorDate />
        </CardContent>
      </CardActionArea>

      <AdminReviewButtons />
    </Card>
  );
}
