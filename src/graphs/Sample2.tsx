import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVizbuilder } from '../redux/vizbuilder/selector';
import { Grid, Button } from '@material-ui/core';
import {
  fetchAllMetadataAction,
  fetchEntireDatasetAction
} from '../redux/vizbuilder/actions';

function Sample2() {
  const dispatch = useDispatch();
  const sampleData = useSelector(getVizbuilder);

  return (
    <Grid container item direction="column" xs={3}>
      {console.log(sampleData)}
      <Button
        variant="contained"
        onClick={() => dispatch(fetchAllMetadataAction())}
      >
        Test Metadata
      </Button>
      <Button
        variant="contained"
        onClick={() =>
          dispatch(fetchEntireDatasetAction('federal_contracts_fy2019'))
        }
      >
        Test Dataset
      </Button>
    </Grid>
  );
}

export default Sample2;
