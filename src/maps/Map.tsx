import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React, { useState } from 'react';
import medianHouseholdIncomeHeatMap from '../common/assets/Local Data/census/median_income_data.js';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import { GeoFilter } from './FiltersComponent';
import LayersComponent from './LayersComponent';
import { BoundSelection } from './MapTypes.js';
import MapView from './MapView';
import SourceLabels from './SourcesComponent';

// TODO: save to stories
// TODO: use redux store instead of state

export const StyledMapContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '97%',
  marginLeft: '10px',
  overflow: 'scroll',
  scrollSnapType: 'y mandatory',
  '&::-webkit-scrollbar': {
    width: '0.5em'
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    backgroundColor: 'rgba(0,0,0,.3)',
    outline: '1px solid slategrey'
  }
});

const defaultMarkerSelection = markerData[0];
const defaultHeatMapSelection = medianHouseholdIncomeHeatMap;
const defaultBoundsSelection: BoundSelection = 'Zip Code';

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
  // TODO: consider putting these in legend so they are associated with their data sets
  const [dataSources, setDataSources] = useState([
    {
      key: 0,
      label: defaultMarkerSelection.source
    },
    {
      key: 1,
      label: defaultHeatMapSelection.source
    }
  ]);
  const [boundSelection, setBoundSelection] = useState(defaultBoundsSelection);
  return (
    <StyledMapContainer>
      <LayersComponent
        markerSelection={markerSelection}
        setMarkerSelection={setMarkerSelection}
        heatMapSelection={heatMapSelection}
        setHeatMapSelection={setHeatMapSelection}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        setDataSources={setDataSources}
      />
      <MapView
        markerSelection={markerSelection}
        heatMapSelection={heatMapSelection}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
      />
      <GeoFilter
        boundSelection={boundSelection}
        setBoundSelection={setBoundSelection}
      />
      <SourceLabels dataSources={dataSources} />
    </StyledMapContainer>
  );
}
export default Map;
