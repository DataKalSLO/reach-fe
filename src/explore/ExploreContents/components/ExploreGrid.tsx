import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import StoryCard from './StoryCard';
import commuteImage from '../images/commute.jpg';
import gradImage from '../images/graduation.jpg';
import campusImage from '../images/campus.jpg';
import propertyImage from '../images/property.png';
import waterImage from '../images/water.jpg';
import housingImage from '../images/housing.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';
import { getExplore } from '../../../redux/explore/selector';
import { fetchAllStories } from '../../../redux/explore/actions';
import { exploreReducer } from '../../../redux/explore/reducer';
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

export default function ExploreGrid() {
  const [spacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();
  const explore = useSelector(getExplore);
  const dispatch = useDispatch();

  dispatch(fetchAllStories());

  const DisplayStories = (props : Array<Story>) => {
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Grid item xs={3}>
              <StoryCard
                id={props[0].id}
                userID={props[0].userID}
                description={props[0].description}
                title={props[0].title}
                storyBlocks={props[0].storyBlocks}
              />
            </Grid>
            {/* <Grid item xs={3}>
              <StoryCard
                id={props[1].id}
                userID={props[1].userID}
                description={props[1].description}
                title={props[1].title}
                storyBlocks={props[1].storyBlocks}
              />
            </Grid>
            <Grid item xs={3}>
              <StoryCard
                id={props[2].id}
                userID={props[2].userID}
                description={props[2].description}
                title={props[2].title}
                storyBlocks={props[2].storyBlocks}
              />
            </Grid> */}
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Grid item xs={3}>
              <StoryCard
                id={props[3].id}
                userID={props[3].userID}
                description={props[3].description}
                title={props[3].title}
                storyBlocks={props[3].storyBlocks}
              />
            </Grid>
            <Grid item xs={3}>
              <StoryCard
                id={props[4].id}
                userID={props[4].userID}
                description={props[4].description}
                title={props[4].title}
                storyBlocks={props[4].storyBlocks}
              />
            </Grid>
            <Grid item xs={3}>
              <StoryCard
                id={props[5].id}
                userID={props[5].userID}
                description={props[5].description}
                title={props[5].title}
                storyBlocks={props[5].storyBlocks}
              />
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    );
  }
  return < DisplayStories { ...explore.data }  />
}
