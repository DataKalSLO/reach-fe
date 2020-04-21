import React from 'react';

//React-map needs a number type be we use a string to pass a percentage of the screen for the map
//TODO: find a way to parse '90%' and '60vh' into an int then the type conversion will be happy
//Note: parseInt() does not work
export type ViewPort = {
  width: number;
  height: number;
  latitude: number;
  longitude: number;
  zoom: number;
};
export type SetViewPort = (
  value: React.SetStateAction<{
    width: number;
    height: number;
    latitude: number;
    longitude: number;
    zoom: number;
  }>
) => void;

export interface PrepGeoObject {
  type: string;
  geometry: { type: string; coordinates: number[][][] };
  properties: { NO_DATA: number; 'zip-code-tabulation-area': string };
}

export type ColorAssociation = { [name: string]: { [color: string]: string } };
export type SetColorAssociation = React.Dispatch<
  React.SetStateAction<{ [name: string]: { [color: string]: string } }>
>;

export interface LocationFeatures {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    name: string;
    value: string;
  };
}

// types for various props passed to map and layers interfaces
export interface MarkerSelection {
  type: string;
  name: string;
  vintage: string;
  source: string;
  features: LocationFeatures[][];
}
export type SetMarkerSelection = React.Dispatch<
  React.SetStateAction<MarkerSelection[]>
>;
export type SelectedMarker = LocationFeatures[];
export type SetSelectedMarker = React.Dispatch<
  React.SetStateAction<LocationFeatures[]>
>;

export interface HeatMapSelection {
  type: string;
  name: string;
  valueKey: string;
  vintage: string;
  source: string;
  // TODO: features includes a key (valueKey) that is used to get the value,
  // not sure how to make that a usable type in the features below
  // eslint-disable-next-line
  features: any[];
}
// TODO: can't figure out how to make this work with adding
// either a heat map or nothing in handleChange in LayersSelection
// eslint-disable-next-line
export type SetHeatMapSelection = React.Dispatch<React.SetStateAction<any>>;;
export type BoundSelection = 'Zip Code' | 'Communities' | 'Region';
export type SetBoundSelection = React.Dispatch<
  React.SetStateAction<BoundSelection>
>;
export type DataSources = {
  key: number;
  label: string;
}[];
export type SetDataSources = React.Dispatch<React.SetStateAction<DataSources>>;

// type for either marker or heat map selection
export type MarkerOrHeatMap = MarkerSelection[] | HeatMapSelection[];

// type interface for props passed to MapView in Map.tsx
export interface MapViewProps {
  markerSelection: MarkerSelection[];
  heatMapSelection: HeatMapSelection;
  selectedMarker: SelectedMarker;
  setSelectedMarker: SetSelectedMarker;
  colorAssociation: ColorAssociation;
  setColorAssociation: SetColorAssociation;
}

// type interface for props passed to LayersComponent in Map.tsx
export interface LayersComponentProps {
  markerSelection: MarkerSelection[];
  setMarkerSelection: SetMarkerSelection;
  heatMapSelection: HeatMapSelection;
  setHeatMapSelection: SetHeatMapSelection;
  selectedMarker: SelectedMarker;
  setSelectedMarker: SetSelectedMarker;
  setDataSources: SetDataSources;
}

// placeholder type interface for props passed to FiltersComponent in Map.tsx
export interface GeoFilterComponentProps {
  boundSelection: BoundSelection;
  setBoundSelection: SetBoundSelection;
}

// type interface for props passed to SourceComponent in Map.tsx
export interface SourceComponentProps {
  dataSources: DataSources;
}

export interface TooltipProps {
  value: number;
  zipCode: string;
}

export interface FeatureProperty {
  properties: { name: string };
}

export interface ChipLegendProps {
  heatMapSelection: HeatMapSelection;
  colorAssociation: ColorAssociation;
  markerSelection: MarkerSelection[];
}
