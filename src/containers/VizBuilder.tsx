import React, { Fragment } from 'react';
import { Grid, Container } from '@material-ui/core';
import { useVizBuilderStyles } from './VizBuilderStyles';
import Map from '../maps/Map';
import Graph from '../graphs/Graph';
import SplitterLayout from 'react-splitter-layout';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import 'react-splitter-layout/lib/index.css';

function VizBuilder() {
  const classes = useVizBuilderStyles();
  return (
    <Fragment>
      <Container className={classes.root} maxWidth={'xl'}>
        <SplitterLayout>
          <Grid item className={classes.grid} xs={12}>
            <ArrowBackIosIcon
              className={classes.leftNav}
              fontSize={'default'}
            />
            <Map />
          </Grid>
          <Grid item className={classes.grid} xs={12}>
            <ArrowBackIosIcon
              className={classes.rightNav}
              fontSize={'default'}
            />
            <Graph />
          </Grid>
        </SplitterLayout>
      </Container>
    </Fragment>
  );
}

export default VizBuilder;
