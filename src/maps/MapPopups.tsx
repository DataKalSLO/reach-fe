import React from 'react';
import { Popup } from 'react-map-gl';
import { POPUP_OFFSET_LEFT } from './constants';
import { LocationFeatures, SelectedMarker } from './types';
import { useDispatch } from 'react-redux';
import { updateSelectedMarker } from '../redux/map/actions';

export default function Popups(
  marker: LocationFeatures,
  selectedMarker: SelectedMarker
) {
  const dispatch = useDispatch();
  return (
    <Popup
      key={marker.properties.name}
      latitude={marker.geometry.coordinates[0]}
      longitude={marker.geometry.coordinates[1]}
      anchor="bottom"
      onClose={() => {
        dispatch(updateSelectedMarker(selectedMarker));
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
