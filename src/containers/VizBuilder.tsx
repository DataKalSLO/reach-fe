import React from 'react';
import Graph from '../graphs/Graph';
import Map from '../maps/Map';
import { Grid, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import GraphContainer from '../graphs/GraphContainer';

function VizBuilder() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      border="1px solid red"
      alignContent="center"
    >
      <SplitterLayout  vertical={true} 
      primaryIndex={0}
      primaryMinSize={80}
      secondaryMinSize={55}
      secondaryInitialSize={55}>
        <SplitterLayout percentage={true} primaryMinSize={0}>
          <Grid item xs={12} 
                style={{ padding: "30px" ,
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center"}}>
            <Map />
          </Grid>
          <Grid item xs={12}>
            <GraphContainer />
          </Grid>
        </SplitterLayout>
        <Grid style={{height:"20vh",
                      justifyContent:"center",
                      alignContent:"center",
                      alignItems:"right",
                      flexDirection:"row",
                      //border:"4px solid red",
                      paddingLeft: "450px",
                      paddingTop:"8px"
                
        }}>
          <Button style={{backgroundColor:"lightGreen",marginRight:"10px"}}>Education</Button>
          <Button style={{backgroundColor:"lightblue",marginRight:"10px"}}>Economy</Button>
          <Button style={{backgroundColor:"pink",marginRight:"10px"}}>Housing and Living</Button>
          <Button style={{backgroundColor:"yellow",marginRight:"10px"}}>Health</Button>
          <Button style={{backgroundColor:"grey"}}>Industry</Button>
        </Grid>
      </SplitterLayout>      
    </Box>
  );
}

export default VizBuilder;
