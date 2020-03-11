import React from 'react';
import { configure, shallow } from 'enzyme';
import LayersComponent, { handleDisable, allData } from './LayersComponent';
import Adapter from 'enzyme-adapter-react-16';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import medianHouseholdIncomeHeatMap from '../common/assets/Local Data/census/median_income_data.js';

React.useLayoutEffect = React.useEffect;

configure({ adapter: new Adapter() });

describe('<LayersComponent/> with no props', () => {
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
  const props = {
    markerSelection: [],
    setMarkerSelection: jest.fn().mockResolvedValue([]),
    heatMapSelection: [],
    setHeatMapSelection: jest.fn().mockResolvedValue([]),
    selectedMarker: [],
    setSelectedMarker: jest.fn().mockResolvedValue([]),
    setDataSources: jest.fn().mockResolvedValue([])
  };
  const container = shallow(<LayersComponent {...props} />);
  it('should match with snapshot', () => {
    expect(container.html()).toMatchSnapshot();
  });
});

describe('Testing handleDisable()', () => {
  const markerSelection = [markerData[0], markerData[1]];
  const heatMapSelection = medianHouseholdIncomeHeatMap;
  const option = markerData[0];
  it('markerSelection, heatMapSelection, selectedMarker, and dataSources should have the correct values', () => {
    const expectedReturn = true;
    expect(
      handleDisable(allData, markerSelection, heatMapSelection, option)
    ).toEqual(expectedReturn);
  });
});
