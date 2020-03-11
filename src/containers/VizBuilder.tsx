import React, { Fragment } from 'react';
import { Grid, Container } from '@material-ui/core';
import { useVizBuilderStyles } from '../graphs/container/styles';
import GraphContainer from '../graphs/container/GraphContainer';
import Map from '../maps/Map';
<<<<<<< HEAD
import { Grid, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import GraphContainer from '../graphs/GraphContainer';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
=======
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Options from '../graphs/container/Options';
export interface OptionsProp {
  onClickHandle(grpahOptions: any): void;
}

export interface ContainerProps {
  clicked: any;
}
>>>>>>> 874cc2393f197bc01e35dad96eb429688829b843

function VizBuilder() {
  const classes = useVizBuilderStyles();
  const [state, setState] = React.useState([]);
  const handleOptionsClick = (graphOptions: any) => {
    console.log('object');
    console.log(graphOptions);
    setState(graphOptions);
  };

  return (
<<<<<<< HEAD
    <Box
      display="flex"
      flexDirection="row"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      //border="5px solid red"
      alignContent="center"
    >
      <SplitterLayout
        vertical={true}
        primaryIndex={0}
        primaryMinSize={80}
        secondaryMinSize={65}
        secondaryInitialSize={65}
      >
        <SplitterLayout percentage={true} primaryMinSize={0}>
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              paddingTop: '30px'
            }}
          >
            <Map />
          </Grid>
          <Grid item xs={12}>
            <GraphContainer />
          </Grid>
        </SplitterLayout>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          style={{ paddingTop: '10px', paddingBottom: '10px' }}
        >
          <Fab
            size="large"
            variant="extended"
            style={{ backgroundColor: 'lightGreen' }}
          >
            <CastForEducationIcon style={{ paddingRight: '3px' }} />
          </Fab>
          <Fab variant="extended" style={{ backgroundColor: 'lightblue' }}>
            <MonetizationOnIcon />
            Economy
          </Fab>
          <Fab variant="extended" style={{ backgroundColor: 'pink' }}>
            Housing and Living
          </Fab>
          <Fab variant="extended" style={{ backgroundColor: 'yellow' }}>
            Health
          </Fab>
          <Fab variant="extended" style={{ backgroundColor: 'grey' }}>
            Industry
          </Fab>
        </Grid>
      </SplitterLayout>
    </Box>
=======
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
            <GraphContainer clicked={state} />
          </Grid>
        </SplitterLayout>
      </Container>
      <Options onClickHandle={handleOptionsClick} />
    </Fragment>
>>>>>>> 874cc2393f197bc01e35dad96eb429688829b843
  );
}

export default VizBuilder;
