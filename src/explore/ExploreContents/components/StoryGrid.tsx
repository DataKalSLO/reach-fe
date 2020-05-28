import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import StoryCard from '../../../common/components/StoryCard';
import { getAllStories } from '../../../api/stories/operations';
import { Story } from '../../../redux/story/types';

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

export default function StoryGrid() {
  const [spacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();
  const [stories, setStories] = React.useState([] as Story[]);

  useEffect(() => {
    getAllStories().then(storydata => setStories(storydata));
  });

  const makeStories = () => {
    return stories.map((storyInfo: Story) => {
      return <StoryCard key={storyInfo.id} story={storyInfo} />;
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
