import { Grid, Typography } from '@material-ui/core';
import React from 'react';

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
        <Typography variant="subtitle1" color="textSecondary">
          {props.date}
        </Typography>
      </Grid>
    </Grid>
  );
};
