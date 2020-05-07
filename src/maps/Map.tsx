import React from 'react';
import { useSelector } from 'react-redux';
import { getMap } from '../redux/map/selector';
import GeoFilter from './GeoFilter';
import Layers from './Layers';
import Legend from './Legend';
import MapView from './MapView';

// TODO: save to stories
// TODO: connect to DB!

function Map() {
  const mapState = useSelector(getMap);
  return (
    <div>
      <Layers
        markerSelection={mapState.markerSelection}
        heatMapSelection={mapState.heatMapSelection}
        selectedMarker={mapState.selectedMarker}
      />
      <MapView
        markerSelection={mapState.markerSelection}
        heatMapSelection={mapState.heatMapSelection}
        selectedMarker={mapState.selectedMarker}
        colorAssociation={mapState.colorAssociation}
      />
      <GeoFilter boundSelection={mapState.boundSelection} />
      <Legend
        heatMapSelection={mapState.heatMapSelection}
        colorAssociation={mapState.colorAssociation}
        markerSelection={mapState.markerSelection}
      />
    </div>
  );
}
export default Map;
