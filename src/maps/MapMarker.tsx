import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import RoomIcon from '@material-ui/icons/Room';
import React from 'react';
import { Marker } from 'react-map-gl';
import { ICON_HEIGHT, ICON_WIDTH } from './constants';
import {
  ColorAssociation,
  LocationFeatures,
  MarkerSelection,
  SelectedMarker,
  SetSelectedMarker
} from './types';

// sizing for the markers, min and max to allow for dynamic sizing
const MARKER_MIN_WIDTH = '15px';
const MARKER_MAX_WIDTH = '25px';
const MARKER_MIN_HEIGHT = '20px';
const MARKER_MAX_HEIGHT = '30px';

// call Markers on each marker in markerSelection
export function mapMarkers(
  markerSelection: MarkerSelection[],
  setSelectedMarker: SetSelectedMarker,
  selectedMarker: SelectedMarker,
  colorAssociation: ColorAssociation
) {
  return markerSelection
    .map(
      (collection: {
        type: string;
        name: string;
        features: LocationFeatures[][];
      }) => {
        return Markers(
          collection.features,
          setSelectedMarker,
          selectedMarker,
          colorAssociation,
          collection.name
        );
      }
    )
    .flat();
}

// Markers function takes features, which is the JSON format we have in our local data (reference by going
// to common, then assets, then Local Data). It also takes the function to add the marker into a list of
// selected markers, the set of colors to assign to the set of markers, and the layer which corresponds
// to the color. The function will loop through the array of LocationFeatures and map that set of markers
// to a corresponding color. The information to an individual marker is filled with the data from each
// element in the local data array.
export default function Markers(
  features: LocationFeatures[][],
  setSelectedMarker: SetSelectedMarker,
  selectedMarker: SelectedMarker,
  colorAssociation: { [name: string]: { [color: string]: string } },
  layer: string
) {
  return features.map((location: LocationFeatures[]) => {
    const datapoint = location[0];
    return (
      <Marker
        key={datapoint.properties.name}
        latitude={datapoint.geometry.coordinates[0]}
        longitude={datapoint.geometry.coordinates[1]}
        offsetLeft={-ICON_WIDTH / 2}
        offsetTop={-ICON_HEIGHT}
      >
        <MarkerButton
          onClick={event => {
            event.preventDefault();
            if (!selectedMarker.includes(location[0])) {
              setSelectedMarker(selectedMarker.concat(location[0]));
            } else {
              setSelectedMarker(
                selectedMarker.filter(
                  (obj: {
                    type: string;
                    geometry: { type: string; coordinates: number[] };
                    properties: { name: string };
                  }) => obj !== datapoint
                )
              );
            }
          }}
        >
          <div>
            <RoomIcon style={colorAssociation[layer]} />
          </div>
        </MarkerButton>
      </Marker>
    );
  });
}

const MarkerButton = styled(Button)({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  minWidth: MARKER_MIN_WIDTH,
  maxWidth: MARKER_MAX_WIDTH,
  minHeight: MARKER_MIN_HEIGHT,
  maxHeight: MARKER_MAX_HEIGHT,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent'
  }
});
