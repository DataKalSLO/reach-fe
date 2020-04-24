import React, { Fragment, useState } from 'react';
import { Grid, Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Map from '../maps/Map';
import SplitterLayout from 'react-splitter-layout';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import GraphContainer from '../graphs/container/GraphContainer';
import OptionsBar from '../graphs/container/OptionsBar';
import 'react-splitter-layout/lib/index.css';

function VizBuilder() {
  const [dragging, setDragging] = useState(false);

  return (
    <Fragment>
      <StyledContainer maxWidth={'xl'}>
        <SplitterLayout
          onDragEnd={() => setDragging(false)}
          onDragStart={() => setDragging(true)}
        >
          <StyledGrid item xs={12}>
            <Map />
            {dragging ? <LeftArrow fontSize={'large'} /> : <div />}
          </StyledGrid>
          <StyledGrid item xs={12}>
            {dragging ? <RightArrow fontSize={'large'} /> : <div />}
            <GraphContainer />
          </StyledGrid>
        </SplitterLayout>
      </StyledContainer>
      <OptionsBar />
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
  },
  '& .splitter-layout > .layout-splitter': {
    flex: '0 0 auto',
    width: '8px',
    height: '100%',
    cursor: 'col-resize',
    backgroundColor: '#ccc'
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
