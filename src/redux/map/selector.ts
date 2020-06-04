import { RootState } from '../index';

export const getMap = (store: RootState) => store.map;
export const getSelectedTables = (store: RootState) => store.map.selectedTables;
export const getMarkerSelection = (store: RootState) =>
  store.map.markerSelection;
export const getHeatMapSelection = (store: RootState) =>
  store.map.heatMapSelection;
export const getSelectedMarker = (store: RootState) => store.map.selectedMarker;
export const getBoundSelection = (store: RootState) => store.map.boundSelection;
export const getColorAssociation = (store: RootState) =>
  store.map.colorAssociation;
export const getSelectedColumn = (store: RootState) => store.map.selectedColumn;
