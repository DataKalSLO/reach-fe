import { Box, Card } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React, { useState } from 'react';
import medianHouseholdIncomeHeatMap from '../common/assets/Local Data/census/median_income_data.js';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import GeoFilter from './GeoFilter';
import Layers from './Layers';
import { BoundSelection, ColorAssociation } from './types.js';
import MapView from './MapView';
import Legend from './Legend';
import {
  SCROLL_SNAP_TYPE,
  SCROLLBAR_WIDTH,
  SCROLLBAR_WEBKIT_BOX_SHADOW,
  WEBKIT_BORDER_RADIUS,
  WEBKIT_BACKGROUND_COLOR,
  WEBKIT_OUTLINE
} from '../theme/theme.js';

// TODO: save to stories
// TODO: use redux store instead of state

const defaultMarkerSelection = markerData[0];
const defaultHeatMapSelection = medianHouseholdIncomeHeatMap;
const defaultBoundsSelection: BoundSelection = 'Zip Code';
const defaultColorAssociation: ColorAssociation = {};

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
      <StyledCard>
        <StyledMapContainer>
          <Layers
            markerSelection={markerSelection}
            setMarkerSelection={setMarkerSelection}
            heatMapSelection={heatMapSelection}
            setHeatMapSelection={setHeatMapSelection}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
          />
          <MapView
            markerSelection={markerSelection}
            heatMapSelection={heatMapSelection}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            colorAssociation={colorAssociation}
            setColorAssociation={setColorAssociation}
          />
          <GeoFilter
            boundSelection={boundSelection}
            setBoundSelection={setBoundSelection}
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
  width: '100%',
  height: '100%',
  maxWidth: 'calc(100vw/2)'
});

const StyledCard = styled(Card)({
  position: 'relative',
  height: '98%',
  marginLeft: '15px',
  margin: '10px',
  overflow: 'none'
});

const StyledMapContainer = styled(Box)({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'left',
  height: '100%',
  width: '97%',
  marginLeft: '10px',
  overflow: 'scroll',
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
