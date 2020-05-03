import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import CollectionCard from './CollectionCard';

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

export default function CollectionGrid() {
  const [spacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          <Grid item xs={3}>
            <CollectionCard
              title="Commute Times in Santa Barbara"
              hover="hover"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
              nisi ut aliquip ex ea commodo consequat."
              image={commuteImage}
            />
          </Grid>
          <Grid item xs={3}>
            <CollectionCard
              title="Graduation Rates in Santa Maria"
              hover="hover"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
              nisi ut aliquip ex ea commodo consequat."
              image={gradImage}
            />
          </Grid>
          <Grid item xs={3}>
            <CollectionCard
              title="Housing Prices Rise in SLO County"
              hover="hover"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
              nisi ut aliquip ex ea commodo consequat."
              image={housingImage}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          <Grid item xs={3}>
            <CollectionCard
              title="Cal Poly Admissions Increasing"
              hover="hover"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
              nisi ut aliquip ex ea commodo consequat."
              image={campusImage}
            />
          </Grid>
          <Grid item xs={3}>
            <CollectionCard
              title="Moving Your Business to the Central Coast"
              hover="hover"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
              nisi ut aliquip ex ea commodo consequat."
              image={propertyImage}
            />
          </Grid>
          <Grid item xs={3}>
            <CollectionCard
              title="Water Resources of Atascedero"
              hover="hover"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
              nisi ut aliquip ex ea commodo consequat."
              image={waterImage}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
