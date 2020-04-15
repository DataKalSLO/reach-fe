import React, { Fragment } from 'react';
import { Grid, Container } from '@material-ui/core';
import { useVizBuilderStyles } from './VizBuilderStyles';
import Map from '../maps/Map';
import Graph from '../graphs/Graph';
import SplitterLayout from 'react-splitter-layout';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import 'react-splitter-layout/lib/index.css';

function VizBuilder() {
  const classes = useVizBuilderStyles();
  return (
    <Fragment>
      <Container className={classes.root} maxWidth={'xl'}>
        <SplitterLayout>
          <Grid item className={classes.grid} xs={12}>
            <NavigateBeforeIcon
              className={classes.leftArrow}
              fontSize={'large'}
            />
            <Map />
          </Grid>
          <Grid item className={classes.grid} xs={12}>
            <NavigateNextIcon
              className={classes.rightArrow}
              fontSize={'large'}
            />
            <Graph />
          </Grid>
        </SplitterLayout>
      </Container>
    </Fragment>
  );
}

export default VizBuilder;
