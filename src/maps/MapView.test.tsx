import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { POPUP_OFFSET_LEFT, POPUP_OFFSET_TOP } from './constants';
import Popups from './MapPopups';
import { quantileMaker } from './MapViewHelpers';
import { LocationFeatures } from './types';

React.useLayoutEffect = React.useEffect;

configure({ adapter: new Adapter() });

// Dummy values for testing.
// Values are for Popup
const testPopup = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [0.0, -40.88]
  },
  properties: {
    name: 'Some, Location',
    value: '88%'
  }
};
const testPopups = Array<LocationFeatures>();
// TODO: fix type errors here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setTestedMarker(location: any) {
  testPopups.concat(location);
}

// Testing basic props of Popups, still do not know how to test clicks and similar events.
describe('<Popups /> with props', () => {
  const container = Popups(testPopup, setTestedMarker, testPopups);

  it('default props are set', () => {
    expect(container.props.anchor).toEqual('bottom');
    expect(container.props.offsetLeft).toEqual(POPUP_OFFSET_LEFT);
    expect(container.props.offsetTop).toEqual(POPUP_OFFSET_TOP);
    expect(container.props.closeOnClick).toEqual(false);
    expect(container.props.sortByDepth).toEqual(true);
  });

  it('props are same as values passed in', () => {
    expect(container.key).toEqual('Some, Location');
    expect(container.props.latitude).toEqual(0.0);
    expect(container.props.longitude).toEqual(-40.88);
  });
});

// Quantile Maker from old project.
describe('quantileMaker function', () => {
  const inputs = [
    {
      quantiles: 2,
      min: 0,
      max: 4,
      expected: [
        [0, '#ffffff'],
        [2, '#273c65']
      ]
    },
    {
      quantiles: 5,
      min: 0,
      max: 10,
      expected: [
        [0, '#ffffff'],
        [2, '#c9ced9'],
        [4, '#939eb2'],
        [6, '#5d6d8c'],
        [8, '#273c65']
      ]
    },
    {
      quantiles: 20,
      min: 0,
      max: 100,
      expected: [
        [0, '#ffffff'],
        [5, '#f4f5f7'],
        [10, '#e8eaef'],
        [15, '#dde0e7'],
        [20, '#d2d6df'],
        [25, '#c6ccd6'],
        [30, '#bbc1ce'],
        [35, '#afb7c6'],
        [40, '#a4adbe'],
        [45, '#99a3b6'],
        [50, '#8d98ae'],
        [55, '#828ea6'],
        [60, '#77849e'],
        [65, '#6b7a96'],
        [70, '#606f8e'],
        [75, '#546585'],
        [80, '#495b7d'],
        [85, '#3e5175'],
        [90, '#32466d'],
        [95, '#273c65']
      ]
    }
  ];
  for (let i = 0; i < inputs.length; i++) {
    const { quantiles, min, max, expected } = inputs[i];
    it(`quantiles: ${quantiles}, min: ${min}, max: ${max}`, () => {
      expect(quantileMaker(quantiles, min, max)).toEqual(expected);
    });
  }
});
