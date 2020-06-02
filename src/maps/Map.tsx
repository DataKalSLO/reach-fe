import { Box, Card } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React, { useState } from 'react';
import medianHouseholdIncomeHeatMap from '../common/assets/Local Data/census/median_income_data.js';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import {
  SCROLLBAR_WEBKIT_BOX_SHADOW,
  SCROLLBAR_WIDTH,
  SCROLL_SNAP_TYPE,
  WEBKIT_BACKGROUND_COLOR,
  WEBKIT_BORDER_RADIUS,
  WEBKIT_OUTLINE
} from '../theme/theme.js';
import GeoFilter from './GeoFilter';
import Layers from './Layers';
import Legend from './Legend';
import MapView from './MapView';
import { BoundSelection, ColorAssociation } from './types.js';

// TODO: save to stories
// TODO: use redux store instead of state

const defaultMarkerSelection = markerData[0];
const defaultHeatMapSelection = medianHouseholdIncomeHeatMap;
const defaultBoundsSelection: BoundSelection = 'Zip Code';
const defaultColorAssociation: ColorAssociation = {};

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
  const [markerSelection, setMarkerSelection] = useState([
    defaultMarkerSelection
  ]);
  const [heatMapSelection, setHeatMapSelection] = useState(
    defaultHeatMapSelection
  );
  const [selectedMarker, setSelectedMarker] = useState(
    defaultMarkerSelection.features[0]
  );
  const [colorAssociation, setColorAssociation] = useState(
    defaultColorAssociation
  );
  const [boundSelection, setBoundSelection] = useState(defaultBoundsSelection);
  return (
    <StyledBox>
      <StyledCard variant="outlined">
        <StyledMapContainer>
          <Layers
            markerSelection={markerSelection}
            setMarkerSelection={setMarkerSelection}
            heatMapSelection={heatMapSelection}
            setHeatMapSelection={setHeatMapSelection}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
          />
          <GeoFilter
            boundSelection={boundSelection}
            setBoundSelection={setBoundSelection}
          />
          <MapView
            markerSelection={markerSelection}
            heatMapSelection={heatMapSelection}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            colorAssociation={colorAssociation}
            setColorAssociation={setColorAssociation}
          />
          <Legend
            heatMapSelection={heatMapSelection}
            colorAssociation={colorAssociation}
            markerSelection={markerSelection}
          />
        </StyledMapContainer>
      </StyledCard>
    </StyledBox>
  );
}

const StyledBox = styled(Box)({
  width: BOX_WIDTH,
  height: BOX_HEIGHT,
  maxWidth: BOX_MAX_WIDTH
});

const StyledCard = styled(Card)({
  height: CARD_HEIGHT,
  margin: CARD_MARGIN
});

const StyledMapContainer = styled(Box)({
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
