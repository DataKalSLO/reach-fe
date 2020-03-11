import React, { useState } from 'react';
import MapView from './MapView';
import LayersComponent from './LayersComponent';
import { BasicButtonGroup } from './FiltersComponent';
import SourceLabels from './SourcesComponent';
import VintageComponent from './VintageComponent';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import medianHouseholdIncomeHeatMap from '../common/assets/Local Data/census/median_income_data.js';

// TODO: dummy save to stories
// TODO: vintage component should pull from data

// how will we display this? if we're showing 2 data sets?
// maybe this info ought to go with the legend?
function Map() {
  const [markerSelection, setMarkerSelection] = useState([markerData[0]]);
  const [heatMapSelection, setHeatMapSelection] = useState(
    medianHouseholdIncomeHeatMap
  );
  const [selectedMarker, setSelectedMarker] = useState(
    markerData[0].features[0]
  );
  const [dataSources, setDataSources] = useState([
    {
      key: 0,
      label: markerData[0].source
    },
    {
      key: 1,
      label: medianHouseholdIncomeHeatMap.source
    }
  ]);
  return (
    <div>
      <LayersComponent
        markerSelection={markerSelection}
        setMarkerSelection={setMarkerSelection}
        heatMapSelection={heatMapSelection}
        setHeatMapSelection={setHeatMapSelection}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        dataSources={dataSources}
        setDataSources={setDataSources}
      />
      <MapView
        markerSelection={markerSelection}
        heatMapSelection={heatMapSelection}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
      />
      <BasicButtonGroup />
      <SourceLabels dataSources={dataSources} />
      <VintageComponent />
    </div>
  );
}
export default Map;
