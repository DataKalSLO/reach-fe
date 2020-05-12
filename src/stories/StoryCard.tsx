import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CardHeader
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Story } from '../redux/story/types';
import { AccountCircle } from '@material-ui/icons';

const PLACEHOLDER_TITLE = 'High School Graduation Rates on the Central Coast';
const PLACEHOLDER_DESCRIPTION =
  "High school graduation rates are a critical metric of the effectiveness of our local high schools, as well as our students' college preparedness. This study examines our schools by comparing them to one another as well as state and national metrics.";
const PLACEHOLDER_AUTHOR = 'Bill Writer';
const PLACEHOLDER_DATE = '1/1/20';
const PLACEHOLDER_IMAGE_URL =
  'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.stack.imgur.com%2FLuPIV.png&f=1&nofb=1';

interface StoryCardProps {
  story: Story;
}

const useStyles = makeStyles({
  root: {
    width: 400
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  pos: {
    marginBottom: 12
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

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader title={PLACEHOLDER_TITLE} />
      <CardContent>
        <Grid container direction="column" justify="flex-start" spacing={2}>
          <Grid item>
            <Typography variant="subtitle2">
              {PLACEHOLDER_DESCRIPTION}
            </Typography>
          </Grid>

          <Grid container item wrap="nowrap">
            <Grid container item spacing={1}>
              <Author name={PLACEHOLDER_AUTHOR} picture={<AccountCircle />} />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" color="textSecondary">
                {PLACEHOLDER_DATE}
              </Typography>
            </Grid>
          </Grid>

          <CardMedia
            className={classes.media}
            image={PLACEHOLDER_IMAGE_URL}
            title={props.story.title}
          />
        </Grid>
      </CardContent>
    </Card>
  );
}
