import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import StoryCard from './StoryCard';
import barImage from '../images/bar.png';
import electionImage from '../images/election.jpg';
import engineeringImage from '../images/engineering.jpeg';

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

export default interface StoryCardProps {
  title: string;
  hover: string;
  content: string;
  image: string;
}

export default function ExploreGrid2() {
  const [spacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          <Grid item xs={3}>
            <StoryCard
              title="CENG Admission Rates"
              hover="hover"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  
              nisi ut aliquip ex ea commodo consequat."
              image={engineeringImage}
            />
          </Grid>
          <Grid item xs={3}>
            <StoryCard
              title="Population Increases"
              hover="hover"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  
              nisi ut aliquip ex ea commodo consequat."
              image={barImage}
            />
          </Grid>
          <Grid item xs={3}>
            <StoryCard
              title="Voter Turnout"
              hover="hover"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  
              nisi ut aliquip ex ea commodo consequat."
              image={electionImage}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
