import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Edit, Note } from '@material-ui/icons';
import React from 'react';
import { Button } from '../common/components/Button';
import { IconButton } from '../common/components/IconButton';
import { Story } from '../redux/story/types';
import { theme } from '../theme/theme';

const PLACEHOLDER_AUTHOR_NAME = 'Bill Writer';
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
  actions: {
    float: 'right'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  title: {
    fontSize: '2em'
  },
  pos: {
    marginBottom: 12
  }
});

export default function StoryCard(props: StoryCardProps): JSX.Element {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActions className={classes.actions}>
        <Button
          onClick={() => alert('delete!')}
          edge="end"
          aria-label="Delete block"
          style={{ 'background-color': theme.palette.primary.main }}
          endIcon={<Note />}
          label="Draft"
        />
        <IconButton
          onClick={() => alert('delete!')}
          edge="end"
          aria-label="Delete block"
          style={{ color: theme.palette.primary.main }}
          icon={<Edit />}
        />
        <IconButton
          onClick={() => alert('delete!')}
          edge="end"
          aria-label="Delete block"
          style={{ color: theme.palette.error.main }}
          icon={<Delete />}
        />
      </CardActions>
      <CardContent>
        <Typography className={classes.title}>{props.story.title}</Typography>
        <Typography variant="h5" component="h2">
          {props.story.description}
        </Typography>
        <Box
          display="flex"
          flex-direction="row"
          justify-content="space-between"
        >
          <Typography variant="h5" component="h2">
            {PLACEHOLDER_AUTHOR_NAME}
          </Typography>
          <Typography variant="h5" component="h2">
            {PLACEHOLDER_DATE}
          </Typography>
        </Box>
        <CardMedia
          className={classes.media}
          image={PLACEHOLDER_IMAGE_URL}
          title={props.story.title}
        />
      </CardContent>
    </Card>
  );
}
