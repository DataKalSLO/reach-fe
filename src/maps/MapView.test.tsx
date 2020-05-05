import chroma from 'chroma-js';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Popups from './MapPopups';
import { LocationFeatures } from './types';
import { quantileMaker } from './MapViewHelpers';

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
// eslint-disable-next-line
function setTestedMarker(location: any) {
  testPopups.concat(location);
}

// Testing basic props of Popups, still do not know how to test clicks and similar events.
describe('<Popups /> with props', () => {
  const container = Popups(testPopup, setTestedMarker, testPopups);

  it('default props are set', () => {
    expect(container.props.anchor).toEqual('bottom');
    expect(container.props.offsetLeft).toEqual(10);
    expect(container.props.offsetTop).toEqual(0);
    expect(container.props.closeOnClick).toEqual(false);
    expect(container.props.sortByDepth).toEqual(true);
  });

  it('props are same as values passed in', () => {
    expect(container.key).toEqual('Some, Location');
    expect(container.props.latitude).toEqual(0.0);
    expect(container.props.longitude).toEqual(-40.88);
  });
});

// TODO: Test Markers, getting a declaration error. I think it's because the return calls map.
// // Testing Marker
// describe('<Markers /> with props', () => {
//   const container = Markers(
//     testFeatures,
//     setTestedMarker,
//     testPopups,
//     testColorAssociation,
//     testLayer
//   );

//   it('default props are set', () => {});
// });

// Quantile Maker from old project.
describe('quantileMaker function', () => {
  const colorScale = chroma.scale(['white', 'black']).domain([0, 1]);
  const inputs = [
    {
      quantiles: 2,
      min: 0,
      max: 4,
      expected: [
        [0, '#bfbfbf'],
        [2, '#808080']
      ]
    },
    {
      quantiles: 5,
      min: 0,
      max: 10,
      expected: [
        [0, '#e6e6e6'],
        [2, '#cccccc'],
        [4, '#999999'],
        [6, '#666666'],
        [8, '#333333']
      ]
    },
    {
      quantiles: 20,
      min: 0,
      max: 100,
      expected: [
        [0, '#fcfcfc'],
        [5, '#f2f2f2'],
        [10, '#e6e6e6'],
        [15, '#d9d9d9'],
        [20, '#cccccc'],
        [25, '#bfbfbf'],
        [30, '#b3b3b3'],
        [35, '#a6a6a6'],
        [40, '#999999'],
        [45, '#8c8c8c'],
        [50, '#808080'],
        [55, '#737373'],
        [60, '#666666'],
        [65, '#595959'],
        [70, '#4d4d4d'],
        [75, '#404040'],
        [80, '#333333'],
        [85, '#262626'],
        [90, '#1a1a1a'],
        [95, '#0d0d0d']
      ]
    }
  ];
  for (let i = 0; i < inputs.length; i++) {
    const { quantiles, min, max, expected } = inputs[i];
    it(`quantiles: ${quantiles}, min: ${min}, max: ${max}`, () => {
      expect(quantileMaker(colorScale, quantiles, min, max)).toEqual(expected);
    });
  }
});
