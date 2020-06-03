import { Box, Chip as CoreChip, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { DATA_ICON } from '../reach-ui/icons';
import { theme } from '../theme/theme';

export const Title = (props: { text: string }) => (
  <Typography gutterBottom variant="h6" component="h1">
    {props.text}
  </Typography>
);

export const Description = (props: { text: string }) => (
  <Typography paragraph variant="body2" component="body" display="block">
    {props.text}
  </Typography>
);

const AuthorWithProfilePhoto = (props: {
  name: string;
  picture: JSX.Element;
}) => {
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

export const AuthorDate = (props: {
  name: string;
  profilePicture: JSX.Element;
  date: string;
}) => {
  return (
    <Grid container item wrap="nowrap">
      <Grid container item alignItems="center" spacing={1}>
        <AuthorWithProfilePhoto
          name={props.name}
          picture={props.profilePicture}
        />
      </Grid>
      <Grid item>
        <Typography
          gutterBottom={true}
          variant="subtitle1"
          color="textSecondary"
        >
          {props.date}
        </Typography>
      </Grid>
    </Grid>
  );
};

const Chip = (props: { label: string }) => (
  <CoreChip
    size="medium"
    label={props.label}
    style={{ margin: theme.spacing(0.5) }}
    icon={DATA_ICON}
  />
);

export const Chips = (props: { labels: string[] }) => (
  <Box display="flex" flexWrap="wrap" style={{ margin: theme.spacing(-0.25) }}>
    {props.labels.map((label, index) => (
      <Chip key={index} label={label} />
    ))}
  </Box>
);
