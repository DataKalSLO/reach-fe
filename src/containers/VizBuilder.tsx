import { Container, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { setTab } from '../common/components/PersistentDrawer';
import { CONTAINER_HEIGHT } from '../graphs/container/constants';
import GraphContainer from '../graphs/container/GraphContainer';
import { sidebarWidth as initiativesSidebarWidth } from '../graphs/container/InitiativesSidebar';
import Map from '../maps/Map';
import { INITIATIVES_SIDEBAR } from '../reach-ui/constants';
import { HEALTH } from '../redux/graphs/constants';
import { getAllMetadata } from '../redux/vizbuilder/actions';

const splitterMinSize = 22; // the width of the center line and arrows on both sides

function VizBuilder() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMetadata());
  });

  // Set the initial tab to health (since, as of June 2020, it had the most interesting & updated graphs)
  setTab(INITIATIVES_SIDEBAR, HEALTH);

  return (
    <StyledContainer maxWidth={'xl'}>
      <SplitterLayout
        primaryMinSize={splitterMinSize}
        secondaryMinSize={splitterMinSize + initiativesSidebarWidth}
      >
        <StyledGrid container item xs={12}>
          <LeftArrow fontSize={'large'} />
          <Map />
        </StyledGrid>
        <StyledGrid container item xs={12}>
          <RightArrow fontSize={'large'} />
          <GraphContainer />
        </StyledGrid>
      </SplitterLayout>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  height: CONTAINER_HEIGHT,
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
