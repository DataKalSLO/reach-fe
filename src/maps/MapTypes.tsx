import React from 'react';

// TODO: For featureCollection type in MapView, not finished
// export interface PrepGeoData {
//   objects: Array<PrepGeoObject>;
// }

// export interface PrepGeoObject {
//   type: string;
//   geometry: {
//     type: string;
//     coordinates: number[][][];
//   };
//   properties: {
//     ZCTA5CE10: string;
//     AFFGEOID10: string;
//     GEOID10: string;
//     ALAND10: number;
//     AWATER10: number;
//     B25053_006E: number;
//     'zip-code-tabulation-area': string;
//   };
// } | { ..., }

export interface LocationFeatures {
  type: string;
  geometry: {
    type: string;
    coordinates: Array<number>;
  };
  properties: {
    name: string;
  };
}

// types for various props passed to map and layers interfaces
export type MarkerSelection = {
  type: string;
  name: string;
  features: LocationFeatures[][];
}[];
export type SetMarkerSelection = React.Dispatch<
  React.SetStateAction<MarkerSelection>
>;
export type SelectedMarker = LocationFeatures[];
export type SetSelectedMarker = React.Dispatch<
  React.SetStateAction<LocationFeatures[]>
>;
// not sure why types won't work here
export type HeatMapSelection = {
  type: string;
  name: string;
  valueKey: string;
  features: any[];
};
export type SetHeatMapSelection = any;

// type interface for props passed in Map.tsx
export interface MapViewProps {
  markerSelection: MarkerSelection;
  heatMapSelection: HeatMapSelection;
  selectedMarker: SelectedMarker;
  setSelectedMarker: SetSelectedMarker;
}

// type interface for props passed in Map.tsx
export interface LayersComponentProps {
  markerSelection: MarkerSelection;
  setMarkerSelection: SetMarkerSelection;
  heatMapSelection: HeatMapSelection;
  setHeatMapSelection: SetHeatMapSelection;
  selectedMarker: SelectedMarker;
  setSelectedMarker: SetSelectedMarker;
}
