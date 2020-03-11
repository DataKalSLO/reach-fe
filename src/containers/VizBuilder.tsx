import React, { Fragment } from 'react';
import { Grid, Container } from '@material-ui/core';
import { useVizBuilderStyles } from '../graphs/container/styles';
import GraphContainer from '../graphs/container/GraphContainer';
import Map from '../maps/Map';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Options from '../graphs/container/Options';

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
            <GraphContainer />
          </Grid>
        </SplitterLayout>
      </Container>
      <Options />
    </Fragment>
  );
}

export default VizBuilder;
