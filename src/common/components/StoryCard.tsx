import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import { Story } from '../redux/story/types';

//TODO: Add a way to get author, date, and image url from passed in props
const PLACEHOLDER_AUTHOR = 'Bill Writer';
const PLACEHOLDER_USER_PICTURE = <AccountCircle />;
const PLACEHOLDER_DATE = '1/1/20';
const PLACEHOLDER_IMAGE_URL =
  'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.stack.imgur.com%2FLuPIV.png&f=1&nofb=1';

interface StoryCardProps {
  story: Story;
}

const useStyles = makeStyles({
  card: {
    width: '30%',
    minWidth: 250,
    maxWidth: 500,
    height: '20%',
    margin: 10,
    padding: 2,
    display: 'flex'
  },
  header: {
    paddingBottom: 0
  },
  media: {
    height: 0,
    width: '100%',
    paddingTop: '60%'
  }
});

export default function StoryCard(props: StoryCardProps): JSX.Element {
  const classes = useStyles();

  const Author = (props: { name: string; picture: JSX.Element }) => {
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

  const FormattedAuthorDate = () => {
    return (
      <Grid container item wrap="nowrap">
        <Grid container item alignItems="center" spacing={1}>
          <Author
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

  return (
    <Card className={classes.card} variant="outlined">
      <CardActionArea>
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
            variant="subtitle2"
            component="body"
            display="block"
          >
            {props.story.description}
          </Typography>
          <FormattedAuthorDate />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
