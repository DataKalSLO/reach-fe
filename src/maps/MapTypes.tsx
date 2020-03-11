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
    value: string;
  };
}

// types for various props passed to map and layers interfaces
export type MarkerSelection = {
  type: string;
  name: string;
  vintage: string;
  source: string;
  features: LocationFeatures[][];
}[];
export type SetMarkerSelection = React.Dispatch<
  React.SetStateAction<MarkerSelection>
>;
export type SelectedMarker = LocationFeatures[];
export type SetSelectedMarker = React.Dispatch<
  React.SetStateAction<LocationFeatures[]>
>;

export type HeatMapSelection = {
  type: string;
  name: string;
  valueKey: string;
  // TODO: going to solve "any" errors at a later time, ignoring for demo
  // eslint-disable-next-line
  features: any[];
};
// TODO: going to solve "any" errors at a later time, ignoring for demo
// eslint-disable-next-line
export type SetHeatMapSelection = any;
export type DataSources = {
  key: number;
  label: string;
}[];
export type SetDataSources = React.Dispatch<React.SetStateAction<DataSources>>;

// type interface for props passed to MapView in Map.tsx
export interface MapViewProps {
  markerSelection: MarkerSelection;
  heatMapSelection: HeatMapSelection;
  selectedMarker: SelectedMarker;
  setSelectedMarker: SetSelectedMarker;
}

// type interface for props passed to LayersComponent in Map.tsx
export interface LayersComponentProps {
  markerSelection: MarkerSelection;
  setMarkerSelection: SetMarkerSelection;
  heatMapSelection: HeatMapSelection;
  setHeatMapSelection: SetHeatMapSelection;
  selectedMarker: SelectedMarker;
  setSelectedMarker: SetSelectedMarker;
  setDataSources: SetDataSources;
}

// type interface for props passed to SourceComponent in Map.tsx
export interface SourceComponentProps {
  dataSources: DataSources;
}
