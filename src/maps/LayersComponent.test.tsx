import React from 'react';
import { configure, shallow } from 'enzyme';
import LayersComponent from './LayersComponent';
import Adapter from 'enzyme-adapter-react-16';

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
    dataSources: [],
    setDataSources: jest.fn().mockResolvedValue([])
  };
  const container = shallow(<LayersComponent {...props} />);
  it('should match with snapshot', () => {
    expect(container.html()).toMatchSnapshot();
  });
});
