import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMap } from '../redux/map/selector';
import { getVizbuilder } from '../redux/vizbuilder/selector';
import { Box, Card } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import GeoFilter from './GeoFilter';
import Layers from './Layers';
import Legend from './Legend';
import MapView from './MapView';
import {
  SCROLLBAR_WEBKIT_BOX_SHADOW,
  SCROLLBAR_WIDTH,
  SCROLL_SNAP_TYPE,
  WEBKIT_BACKGROUND_COLOR,
  WEBKIT_BORDER_RADIUS,
  WEBKIT_OUTLINE
} from '../theme/theme.js';
import { getAllTableNames } from '../redux/vizbuilder/actions';

// TODO: save to stories

const BOX_WIDTH = '100%';
const BOX_HEIGHT = '100%';
const BOX_MAX_WIDTH = 'calc(100vw/2)';

const CARD_HEIGHT = '95%';
const CARD_MARGIN = '15px';

const MAP_HEIGHT = '100%';
const MAP_WIDTH = '97%';
const MAP_MARGIN_LEFT = '10px';
const MAP_OVERFLOW = 'scroll';

function Map() {
  const dispatch = useDispatch();
  const mapState = useSelector(getMap);
  const vizBuilderState = useSelector(getVizbuilder);

  useEffect(() => {
    getAllTableNames()(dispatch);
  }, [dispatch]);

  console.log(mapState);
  console.log(vizBuilderState);

  return (
    <StyledBox>
      <StyledCard variant="outlined">
        <StyledMapContainer>
          <Layers
            tableNames={vizBuilderState.datasetTableNames}
            selectedTables={mapState.selectedTables}
            markerSelection={mapState.markerSelection}
            heatMapSelection={mapState.heatMapSelection}
            selectedMarker={mapState.selectedMarker}
          />
          <GeoFilter boundSelection={mapState.boundSelection} />
          <MapView
            markerSelection={mapState.markerSelection}
            heatMapSelection={mapState.heatMapSelection}
            selectedMarker={mapState.selectedMarker}
            colorAssociation={mapState.colorAssociation}
          />
          <Legend
            heatMapSelection={mapState.heatMapSelection}
            colorAssociation={mapState.colorAssociation}
            markerSelection={mapState.markerSelection}
          />
        </StyledMapContainer>
      </StyledCard>
    </StyledBox>
  );
}

export const StyledBox = styled(Box)({
  width: BOX_WIDTH,
  height: BOX_HEIGHT,
  maxWidth: BOX_MAX_WIDTH
});

export const StyledCard = styled(Card)({
  height: CARD_HEIGHT,
  margin: CARD_MARGIN
});

export const StyledMapContainer = styled(Box)({
  height: MAP_HEIGHT,
  width: MAP_WIDTH,
  marginLeft: MAP_MARGIN_LEFT,
  overflow: MAP_OVERFLOW,
  scrollSnapType: SCROLL_SNAP_TYPE,
  '&::-webkit-scrollbar': {
    width: SCROLLBAR_WIDTH
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: SCROLLBAR_WEBKIT_BOX_SHADOW,
    webkitBoxShadow: SCROLLBAR_WEBKIT_BOX_SHADOW
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: WEBKIT_BORDER_RADIUS,
    backgroundColor: WEBKIT_BACKGROUND_COLOR,
    outline: WEBKIT_OUTLINE
  }
});

export default Map;
