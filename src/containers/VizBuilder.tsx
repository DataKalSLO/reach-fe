import React, { useState } from 'react';
import Graph from '../graphs/Graph';
import Map from '../maps/Map';
import { Grid, Button } from '@material-ui/core';
import MenuButton from '../nav/MenuButton';
import { width } from '@material-ui/system';
import { height } from '@material-ui/system';
import {makeStyles} from '@material-ui/core/styles'


function VizBuilder() {
    return (
      <Grid style = {{border:'1px solid red', height: '100%', width: '100%'}} item container xs={12} >
        <Grid item xs = {6}>
            <Map/>
        </Grid>
        <Grid style = {{border:'1px solid yellow'}} item xs = {6}>
            <Graph/>
        </Grid>
      </Grid>
    )
}

export default VizBuilder;