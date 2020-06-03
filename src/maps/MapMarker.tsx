import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import RoomIcon from '@material-ui/icons/Room';
import React from 'react';
import { Marker } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import { updateSelectedMarker } from '../redux/map/actions';
import { ICON_HEIGHT, ICON_WIDTH } from './constants';
import {
  ColorAssociation,
  MarkerFeatures,
  MarkerSelection,
  SelectedMarker
} from './types';

// call Markers on each marker in markerSelection
export function mapMarkers(
  markerSelection: MarkerSelection[],
  selectedMarker: SelectedMarker,
  colorAssociation: ColorAssociation
) {
  return markerSelection
    .map(
      (collection: {
        type: string;
        name: string;
        features: MarkerFeatures[][];
      }) => {
        return Markers(
          collection.features,
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
// to the color. The function will loop through the array of MarkerFeatures and map that set of markers
// to a corresponding color. The information to an individual marker is filled with the data from each
// element in the local data array.
export default function Markers(
  features: MarkerFeatures[][],
  selectedMarker: SelectedMarker,
  colorAssociation: { [name: string]: { [color: string]: string } },
  layer: string
) {
  const dispatch = useDispatch();
  console.log(features);
  return features.map((location: MarkerFeatures[]) => {
    const datapoint = location[0];
    return (
      <Marker
        key={datapoint.properties.name}
        latitude={datapoint.geometry.coordinates[1]}
        longitude={datapoint.geometry.coordinates[0]}
        offsetLeft={-ICON_WIDTH / 2}
        offsetTop={-ICON_HEIGHT}
      >
        <MarkerButton
          onClick={event => {
            event.preventDefault();
            if (!selectedMarker.includes(location[0])) {
              dispatch(
                updateSelectedMarker(selectedMarker.concat(location[0]))
              );
            } else {
              dispatch(
                updateSelectedMarker(
                  selectedMarker.filter(
                    (obj: {
                      type: string;
                      geometry: { type: string; coordinates: number[] };
                      properties: { name: string };
                    }) => obj !== datapoint
                  )
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
  // More magic numbers to size the marker
  cursor: 'pointer',
  minWidth: '20px',
  maxWidth: '20px',
  minHeight: '30px',
  maxHeight: '25px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent'
  }
});
