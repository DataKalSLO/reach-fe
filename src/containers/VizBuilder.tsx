import React, { Fragment, useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Map from '../maps/Map';
import SplitterLayout from 'react-splitter-layout';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import GraphContainer from '../graphs/container/GraphContainer';
import OptionsBar from '../graphs/container/OptionsBar';
import 'react-splitter-layout/lib/index.css';
import { useDispatch } from 'react-redux';
import { getAllMetadata } from '../redux/vizbuilder/actions';

function VizBuilder() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMetadata());
  });

  return (
    <Fragment>
      <StyledContainer maxWidth={'xl'}>
        <SplitterLayout primaryMinSize={5} secondaryMinSize={5}>
          <StyledGrid item xs={12}>
            <LeftArrow fontSize={'large'} />
          </StyledGrid>
          <StyledGrid item xs={12}>
            <RightArrow fontSize={'large'} />
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
