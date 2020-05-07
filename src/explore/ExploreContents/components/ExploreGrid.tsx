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
import { ExploreState } from '../../../redux/explore/types';
import { FetchAllStories } from '../../../redux/explore/types';
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

  const DisplayStories = ( props : ExploreState ) => {
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            <Grid item xs={3}>
              <StoryCard {...props.data[0]} />
            </Grid>
            <Grid item xs={3}>
              <StoryCard { ...props.data[1] }/>
            </Grid>
            <Grid item xs={3}>
              <StoryCard { ...props.data[2] }/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return < DisplayStories { ...explore }  />
}
