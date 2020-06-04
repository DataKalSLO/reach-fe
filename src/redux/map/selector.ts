import { RootState } from '../index';

export const getMap = (store: RootState) => store.map;
export const getHeatMapSelection = (store: RootState) =>
  store.map.heatMapSelection;
