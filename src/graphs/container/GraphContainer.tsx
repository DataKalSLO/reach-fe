import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGraphContainerStyles } from './styles';
import { getGraphs } from '../../redux/graphs/selector';
import { Box } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import GraphCreateForm from '../forms/GraphCreateForm';
import GraphDefault from '../components/GraphDefault';
import { uuid } from 'uuidv4';
import GraphPremade from '../components/GraphPremade';

function GraphContainer() {
  const graphState = useSelector(getGraphs);
  const classes = useGraphContainerStyles();
  const [open, setOpen] = useState(false);
  /*
  const handleOpen = () => {
    setOpen(true);
  };
*/

  const handleClose = () => {
    setOpen(false);
  };

  const getGraphComponents = () => {
    const graphs = graphState.graphs.map(
      (graphData: [string, Highcharts.Options], index: number) => {
        return (
          <Box key={index} className={classes.item}>
            <GraphPremade graphData={graphData[1]} graphId={graphData[0]} />
          </Box>
        );
      }
    );
    return [...graphs, <GraphDefault key={uuid()} />];
  };

  return (
    <Fragment>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div>
          {/* // used div above to hold ref from modal */}
          <GraphCreateForm />
        </div>
      </Modal>
      <Box className={classes.list}>{getGraphComponents()}</Box>
      {/* remove button for demo 
      <Button
        className={classes.button}
        endIcon={<Add />}
        color="primary"
        variant="contained"
        onClick={handleOpen}
        size={'large'}
      >
        {ADD_BUTTON_DESC}
      </Button>
      */}
    </Fragment>
  );
}

export default GraphContainer;
