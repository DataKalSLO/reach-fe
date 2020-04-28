import React from 'react';
import { Popup } from 'react-map-gl';
import { POPUP_OFFSET_LEFT } from './constants';
import {
  LocationFeatures,
  SelectedMarker,
  SetSelectedMarker
} from './MapTypes';

export default function Popups(
  marker: LocationFeatures,
  setSelectedMarker: SetSelectedMarker,
  selectedMarker: SelectedMarker
) {
  return (
    <Popup
      key={marker.properties.name}
      latitude={marker.geometry.coordinates[0]}
      longitude={marker.geometry.coordinates[1]}
      anchor="bottom"
      onClose={() => {
        setSelectedMarker(
          selectedMarker.filter(
            (obj: {
              type: string;
              geometry: { type: string; coordinates: number[] };
              properties: { name: string };
            }) => obj !== marker
          )
        );
      }}
      closeOnClick={false}
      sortByDepth={true}
      offsetLeft={POPUP_OFFSET_LEFT}
    >
      <div>
        {marker.properties.name} : {marker.properties.value}
      </div>
    </Popup>
  );
}
