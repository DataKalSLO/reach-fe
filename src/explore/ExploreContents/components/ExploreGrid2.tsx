import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import StoryCard from './StoryCard';
import barImage from '../images/bar.png';
import electionImage from '../images/election.jpg';
import engineeringImage from '../images/engineering.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { getExplore } from '../../../redux/explore/selector';
import { fetchAllStories } from '../../../redux/explore/actions';
import { 
  Story,
  FetchAllStories
 } from '../../../redux/explore/types';

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

interface StoryCardProps {
  data: Array<Story>;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => FetchAllStories;
}
export default function ExploreGrid2() {
  const [spacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  const explore = useSelector(getExplore);
  const dispatch = useDispatch();

  dispatch(fetchAllStories());

  const DisplayStories = (props : StoryCardProps) => {
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Grid item xs={3}>
              <StoryCard
                id={props.data[0].id}
                userID={props.data[0].userID}
                description={props.data[0].description}
                title={props.data[0].title}
                storyBlocks={props.data[0].storyBlocks}
              />
            </Grid>
            <Grid item xs={3}>
              <StoryCard
                id={props.data[1].id}
                userID={props.data[1].userID}
                description={props.data[1].description}
                title={props.data[1].title}
                storyBlocks={props.data[1].storyBlocks}
              />
            </Grid>
            <Grid item xs={3}>
              <StoryCard
                id={props.data[2].id}
                userID={props.data[2].userID}
                description={props.data[2].description}
                title={props.data[2].title}
                storyBlocks={props.data[2].storyBlocks}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
