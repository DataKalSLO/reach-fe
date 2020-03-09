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

// type interface for props passed in Map.tsx
export interface MapViewProps {
  layerSelection: {
    type: string;
    name: string;
    features: LocationFeatures[][];
  }[];
  selectedMarker: LocationFeatures[];
  setSelectedMarker: React.Dispatch<React.SetStateAction<never[]>>;
}
