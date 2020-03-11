import React, { Fragment } from 'react';
import { GraphData, SeriesData } from '../components/types';
import { Graph } from '../components/Graph';
import * as moc from '../data-test';
import { Box, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useGraphContainerStyles } from './styles';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { ADD_BUTTON_DESC } from './constants';
import Modal from '@material-ui/core/Modal';
import GraphCreateForm from '../forms/GraphCreateForm';
import { GraphPremade } from '../components/GraphPremade';
import { ContainerProps } from '../../containers/VizBuilder';
import { GraphIndustryStats } from '../components/GraphIndustryStats';

function GraphContainer({ clicked }: ContainerProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const seriesData: SeriesData[] = [
    {
      seriesType: 'column',
      data: [moc.ColumnDX, moc.Column1Y],
      stackId: 'a'
    },
    {
      seriesType: 'column',
      data: [moc.ColumnDX, moc.Column2Y],
      stackId: 'b'
    }
  ];
  const graphData: GraphData = {
    graphType: 'synchronized',
    graphTitle: 'test',
    xAxisTitle: 'Hello_X',
    seriesData: seriesData
  };

  const seriesData2: SeriesData[] = [
    {
      seriesType: 'column',
      data: [moc.ColumnCX, moc.Column2Y],
      stackId: 'a'
    }
  ];
  const graphData2: GraphData = {
    graphType: 'basic',
    graphTitle: 'test',
    xAxisTitle: 'Hello_X',
    seriesData: seriesData2
  };

  const graphData3: GraphData = {
    graphType: '3D',
    graphTitle: 'test',
    xAxisTitle: 'Hello_X',
    seriesData: seriesData2
  };

  const classes = useGraphContainerStyles();
  const graphList: GraphData[] = [graphData, graphData3, graphData2];
  const graphComponents = graphList.map((graphData, index) => {
    return (
      <Box key={index} className={classes.item}>
        <Graph graphData={graphData} />
      </Box>
    );
  });

  if (clicked) {
    console.log(clicked);
    const state: [] = clicked;
    state.forEach((options: any) => {
      graphComponents.unshift(
        <Box key={graphComponents.length} className={classes.item}>
          <Fragment>
            <GraphPremade optionsList={[options]} />
          </Fragment>
        </Box>
      );
    });
  }

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
      <Box className={classes.list}>{graphComponents}</Box>
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
    </Fragment>
  );
}

export default GraphContainer;
