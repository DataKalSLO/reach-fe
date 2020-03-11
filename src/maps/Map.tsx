import React, { useState } from 'react';
import MapView from './MapView';
import LayersComponent from './LayersComponent';
import { BasicButtonGroup } from './FiltersComponent';
import SourceLabels from './SourcesComponent';
import VintageComponent from './VintageComponent';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import features from '../common/assets/Local Data/census/b25053.js';

// TODO: dummy save to stories - MapView
function Map() {
  const [markerSelection, setMarkerSelection] = useState([markerData[0]]);
  const [heatMapSelection, setHeatMapSelection] = useState(features);
  const [selectedMarker, setSelectedMarker] = useState(
    markerData[0].features[0]
  );
  return (
    <div>
      <LayersComponent
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
      />
      <BasicButtonGroup />
      <SourceLabels />
      <VintageComponent />
    </div>
  );
}
export default Map;
