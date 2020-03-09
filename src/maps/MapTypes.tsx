import React from 'react';

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
