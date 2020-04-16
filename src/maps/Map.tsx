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
    <div>
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
    </div>
  );
}
export default Map;
