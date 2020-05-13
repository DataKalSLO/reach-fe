import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import { Story } from '../redux/story/types';
import { theme } from '../theme/theme';

const PLACEHOLDER_TITLE = 'High School Graduation Rates on the Central Coast';
const PLACEHOLDER_DESCRIPTION =
  "High school graduation rates are a critical metric of the effectiveness of our local high schools, as well as our students' college preparedness.";
const PLACEHOLDER_AUTHOR = 'Bill Writer';
const PLACEHOLDER_DATE = '1/1/20';
const PLACEHOLDER_IMAGE_URL =
  'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.stack.imgur.com%2FLuPIV.png&f=1&nofb=1';

interface StoryCardProps {
  story: Story;
}

const useStyles = makeStyles({
  root: {
    width: '20%',
    minWidth: 250,
    maxWidth: 400,
    height: '20%',
    minHeight: 150,
    maxHeight: 350,
    margin: 10,
    padding: 2
  },
  header: {
    paddingBottom: 0
  },
  media: {
    height: 150,
    width: '100%',
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0)
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
      <CardHeader
        className={classes.header}
        title={PLACEHOLDER_TITLE}
        titleTypographyProps={{ variant: 'h6', component: 'h1' }}
      />
      <CardContent>
        <Grid container direction="column" justify="flex-start" spacing={1}>
          <Grid item>
            <Typography variant="subtitle2" component="body" display="block">
              {PLACEHOLDER_DESCRIPTION}
            </Typography>
          </Grid>

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

          <Grid container item alignItems="flex-start" justify="center">
            <CardMedia
              className={classes.media}
              image={PLACEHOLDER_IMAGE_URL}
              title={props.story.title}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
