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

const PLACEHOLDER_TITLE = 'High School Graduation Rates on the Central Coast';
const PLACEHOLDER_DESCRIPTION =
  "High school graduation rates are a critical metric of the effectiveness of our local high schools, as well as our students' college preparedness.";
const PLACEHOLDER_AUTHOR = 'Bill Writer';
const PLACEHOLDER_DATE = '1/1/20';
const PLACEHOLDER_IMAGE_URL =
  'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.stack.imgur.com%2FLuPIV.png&f=1&nofb=1';

const SAMPLE_STORY: Story = {
  id: '0',
  userID: '0',
  title: PLACEHOLDER_TITLE,
  description: PLACEHOLDER_DESCRIPTION,
  storyBlocks: []
};

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
    // DO NOT add margin or padding on the left or right.
    // It will cause the image to be off-center
  }
});

export default function StoryCard(props: StoryCardProps): JSX.Element {
  const classes = useStyles();

  // TODO: this should take a user object. name and picture will be refactored to come from user
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
          <Author name={PLACEHOLDER_AUTHOR} picture={<AccountCircle />} />
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
            {SAMPLE_STORY.title}
          </Typography>
          <Typography
            paragraph
            variant="subtitle2"
            component="body"
            display="block"
          >
            {SAMPLE_STORY.description}
          </Typography>
          <FormattedAuthorDate />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
