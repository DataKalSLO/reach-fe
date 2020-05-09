import React from 'react';
import { Popup } from 'react-map-gl';
import { updateSelectedMarker } from '../redux/map/actions';
import { POPUP_OFFSET_LEFT, POPUP_OFFSET_TOP } from './constants';
import { LocationFeatures, SelectedMarker } from './types';
import { Dispatch } from 'redux';

export default function Popups(
  marker: LocationFeatures,
  selectedMarker: SelectedMarker,
  dispatch: Dispatch
) {
  return (
    <Popup
      key={marker.properties.name}
      latitude={marker.geometry.coordinates[0]}
      longitude={marker.geometry.coordinates[1]}
      anchor="bottom"
      onClose={() => {
        dispatch(updateSelectedMarker(selectedMarker));
      }}
      closeButton={false}
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
