import React from 'react';
import { Popup } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import { updateSelectedMarker } from '../redux/map/actions';
import { POPUP_OFFSET_LEFT, POPUP_OFFSET_TOP } from './constants';
import { LocationFeatures, SelectedMarker } from './types';

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
      offsetTop={POPUP_OFFSET_TOP}
    >
      <div>
        {marker.properties.name} : {marker.properties.value}
      </div>
    </Popup>
  );
}
