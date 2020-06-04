import { Box, Card } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React, { useState } from 'react';
import medianHouseholdIncomeHeatMap from '../common/assets/Local Data/census/median_income_data.js';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
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

// sizing for the box that contains the map
const BOX_WIDTH = '100%';
const BOX_MIN_WIDTH = '350px';
const BOX_HEIGHT = '100%';
const BOX_MAX_WIDTH = '98hw';

// sizing for the card background which contains everything on the map side
const CARD_HEIGHT = '95%';
const CARD_MARGIN = '15px';

// sizing for the map itself
const MAP_HEIGHT = '100%';
const MAP_WIDTH = '97%';
const MAP_MIN_WIDTH = '350px';
const MAP_MARGIN_LEFT = '10px';

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
  minWidth: BOX_MIN_WIDTH,
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
  minWidth: MAP_MIN_WIDTH,
  marginLeft: MAP_MARGIN_LEFT,
  overflow: 'scroll'
});

export default Map;
