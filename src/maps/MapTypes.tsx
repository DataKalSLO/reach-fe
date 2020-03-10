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
export type LayerSelection = {
  type: string;
  name: string;
  features: LocationFeatures[][];
}[];
export type SetLayerSelection = React.Dispatch<
  React.SetStateAction<LayerSelection>
>;
export type SelectedMarker = LocationFeatures[];
export type SetSelectedMarker = React.Dispatch<
  React.SetStateAction<LocationFeatures[]>
>;

// type interface for props passed in Map.tsx
export interface MapViewProps {
  layerSelection: LayerSelection;
  selectedMarker: SelectedMarker;
  setSelectedMarker: SetSelectedMarker;
}

// type interface for props passed in Map.tsx
export interface LayersComponentProps {
  layerSelection: LayerSelection;
  setLayerSelection: SetLayerSelection;
  selectedMarker: SelectedMarker;
  setSelectedMarker: SetSelectedMarker;
}
