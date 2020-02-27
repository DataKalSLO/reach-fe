import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSample } from '../redux/sample/selectors';
import { Grid, Button } from '@material-ui/core';
import {
  updateSampleAction,
  clearSampleAction,
  updateWithThunk
} from '../redux/sample/actions';

function Sample() {
  const dispatch = useDispatch();
  const sampleData = useSelector(getSample);

  return (
    <Grid container item direction="column" xs={3}>
      <h3>{(sampleData && sampleData.text) || 'No sample text yet'}</h3>
      <Button
        variant="contained"
        onClick={() => dispatch(updateSampleAction({ text: 'Hello World' }))}
      >
        Update to Hello World
      </Button>
      <Button
        variant="contained"
        onClick={() => dispatch(updateWithThunk('Hey Planet'))}
      >
        Update to Hey Planet
      </Button>
      <Button variant="contained" onClick={() => dispatch(clearSampleAction())}>
        Clear sample text
      </Button>
    </Grid>
  );
}

export default Sample;
