// this is the component that is returned when stories or explore displays or saves a map

import React from 'react';
import { MapState } from '../redux/map/types';
import {
  MARKER_ONE_COLOR,
  MARKER_THREE_COLOR,
  MARKER_TWO_COLOR
} from './constants';
import Legend from './Legend';
import { StyledBox, StyledCard, StyledMapContainer } from './Map';
import MapView from './MapView';
import { ColorAssociation, HeatMapSelection, MarkerSelection } from './types';

// supply the markerSelection and heatMapSelection for a populated, interactive map object
export default function GetSavedMap(
  markerSelection: MarkerSelection[],
  heatMapSelection: HeatMapSelection
) {
  // const markerColors = [
  //   { color: MARKER_ONE_COLOR },
  //   { color: MARKER_TWO_COLOR },
  //   { color: MARKER_THREE_COLOR }
  // ];
  // const colorAssociation: ColorAssociation = {};
  // markerSelection.forEach((marker, index) => {
  //   colorAssociation[marker.name] = markerColors[index];
  // });
  // const savedState: MapState = {
  //   selectedColumn: undefined,
  //   selectedTables: [],
  //   markerSelection: markerSelection,
  //   heatMapSelection: heatMapSelection,
  //   selectedMarker: [],
  //   boundSelection: 'Zip Code',
  //   colorAssociation: colorAssociation
  // };

  // return (
  //   <StyledBox>
  //     <StyledCard variant="outlined">
  //       <StyledMapContainer>
  //         <MapView
  //           markerSelection={savedState.markerSelection}
  //           heatMapSelection={savedState.heatMapSelection}
  //           selectedMarker={savedState.selectedMarker}
  //           colorAssociation={savedState.colorAssociation}
  //         />
  //         <Legend
  //           heatMapSelection={savedState.heatMapSelection}
  //           colorAssociation={savedState.colorAssociation}
  //           markerSelection={savedState.markerSelection}
  //         />
  //       </StyledMapContainer>
  //     </StyledCard>
  //   </StyledBox>
  // );
  return <div />;
}
