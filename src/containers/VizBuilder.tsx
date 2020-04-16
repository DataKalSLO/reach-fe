import React, { Fragment } from 'react';
import { Grid, Container } from '@material-ui/core';
import Map from '../maps/Map';
import Graph from '../graphs/Graph';
import SplitterLayout from 'react-splitter-layout';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { styled } from '@material-ui/core/styles';

import 'react-splitter-layout/lib/index.css';

function VizBuilder() {
  const classes = useVizBuilderStyles();
  const [state, setState] = React.useState([]);
  const handleOptionsClick = (graphOptions: any) => {
    setState(graphOptions);
  };

  return (
    <Fragment>
      <StyledContainer maxWidth={'xl'}>
        <SplitterLayout>
          <StyledGrid item xs={12}>
            <LeftArrow fontSize={'large'} />
            <Map />
          </StyledGrid>
          <StyledGrid item xs={12}>
            <RightArrow fontSize={'large'} />
            <Graph />
          </StyledGrid>
        </SplitterLayout>
      </StyledContainer>
    </Fragment>
  );
}

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  height: '90vh',
  padding: '0px',
  position: 'relative',
  overflow: 'hidden',
  '& .splitter-layout .layout-pane': {
    overflow: 'hidden'
  }
});

const StyledGrid = styled(Grid)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  overflow: 'hidden'
});

const LeftArrow = styled(NavigateBeforeIcon)({
  right: '0',
  top: '50%',
  position: 'absolute',
  zIndex: 500
});

const RightArrow = styled(NavigateNextIcon)({
  left: '0',
  top: '50%',
  position: 'absolute',
  zIndex: 500
});

export default VizBuilder;
