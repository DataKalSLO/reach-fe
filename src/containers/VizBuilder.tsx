import React from 'react';
import Graph from '../graphs/Graph';
import Map from '../maps/Map';
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


function VizBuilder() {
  return (
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
  );
}

export default VizBuilder;
