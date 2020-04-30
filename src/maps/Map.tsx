import React, { useState } from 'react';
import medianHouseholdIncomeHeatMap from '../common/assets/Local Data/census/median_income_data.js';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import GeoFilter from './GeoFilter';
import Layers from './Layers';
import { BoundSelection, ColorAssociation } from './types.js';
import MapView from './MapView';
import Legend from './Legend';

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
    <div>
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
    </div>
  );
}
export default Map;
