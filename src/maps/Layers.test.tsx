import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import kitchenFacilitiesHeatMap from '../common/assets/Local Data/census/b25053.js';
import medianHouseholdIncomeHeatMap from '../common/assets/Local Data/census/median_income_data.js';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import { allData, handleDisable } from './Layers';
import { MarkerSelection } from './types';

React.useLayoutEffect = React.useEffect;

configure({ adapter: new Adapter() });

describe('<Layers/> with no props should render', () => {
  // supress warnings (mui & jest don't always get along)
  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = jest.fn(msg => {
      if (msg.includes('Warning: useLayoutEffect does nothing on the server')) {
        return null;
      } else {
        originalConsoleError(msg);
      }
    });
  });
  afterEach(() => {
    console.error = originalConsoleError;
  });
});

describe('handleDisable() should filter the values that the user can select', () => {
  it('handleDisable should return true when any four options are selected, so it disables all further selections', () => {
    const markerSelection = [markerData[1], markerData[0], markerData[1]];
    const heatMapSelection = medianHouseholdIncomeHeatMap;
    const option = markerData[0];
    const expectedReturn = true;
    expect(
      handleDisable(allData, markerSelection, heatMapSelection, option)
    ).toEqual(expectedReturn);
  });

  it('handleDisable should return true when a heat map is already selected and the option at hand is another heat map', () => {
    const markerSelection: MarkerSelection[] = [];
    const heatMapSelection = medianHouseholdIncomeHeatMap;
    const option = kitchenFacilitiesHeatMap;
    const expectedReturn = true;
    expect(
      handleDisable(allData, markerSelection, heatMapSelection, option)
    ).toEqual(expectedReturn);
  });

  it('handleDisable should return false when only one option is selected, so a user can select another marker value', () => {
    const markerSelection: MarkerSelection[] = [];
    const heatMapSelection = medianHouseholdIncomeHeatMap;
    const option = markerData[0];
    const expectedReturn = false;
    expect(
      handleDisable(allData, markerSelection, heatMapSelection, option)
    ).toEqual(expectedReturn);
  });
});
