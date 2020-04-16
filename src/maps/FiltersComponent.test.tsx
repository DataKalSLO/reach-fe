import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { GeoFilter } from './FiltersComponent';

React.useLayoutEffect = React.useEffect;

configure({ adapter: new Adapter() });

// Testing basic props of GeoFilter, still do not know how to test clicks and similar events.
describe('<GeoFilter /> without props', () => {
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
    boundSelection: 'Zip Code' as 'Zip Code',
    setBoundSelection: jest.fn().mockResolvedValue([])
  };
  const container = shallow(<GeoFilter {...props} />);

  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot();
  });
});

// Tried to write a test for clicks but had trouble with .find and finding the button
// describe('Testing handleClick() gets called on click', () => {
//   const props = {
//     setBoundSelection: '',
//     boundSelection: ''
//   };

//   it('handleClick should get called', () => {
//     const wrapper = shallow(<GeoFilter {...props} />);
//     wrapper
//       .find('ButtonGroup')
//       .find('button')
//       .simulate('click');

//   });
// });
