import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import StoryCard from './StoryCard';
import { fetchAllStories } from '../../../api/explore';
import { Story } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      height: 140,
      width: 100
    },
    control: {
      padding: theme.spacing(2)
    }
  })
);

export default function ExploreGrid2() {
  const [spacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();
  const [stories, setStories] = React.useState([]);

  useEffect(() => {
    fetchAllStories().then(function(storydata) {
      console.log(storydata);
      setStories(storydata);
      console.log(stories);
      return storydata;
    });
  });

  const makeStories = () => {
    return stories.map((storyInfo: Story) => {
      return (
        <Grid key={storyInfo.id} item xs={3}>
          <StoryCard
            id={storyInfo.id}
            userID={storyInfo.userID}
            description={storyInfo.description}
            title={storyInfo.title}
            storyBlocks={storyInfo.storyBlocks}
          />
        </Grid>
      );
    });
  };

  const DisplayStories = () => {
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {makeStories()}
          </Grid>
        </Grid>
      </Grid>
    );
  };
  return <DisplayStories />;
}
