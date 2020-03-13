import { shallow } from 'enzyme';
import { generateToolbarButton } from '../StoryToolbar';
import Enzyme from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { TextFields } from '@material-ui/icons';

Enzyme.configure({ adapter: new Adapter() });

// tests dispatch flag checking on the generateToolbarbutton function
test('Test non-dispatch button generation and click', () => {
  const mockDispatch = jest.fn(() => 'called through dispatch');

  let buttonFuncCalls = 0;
  const buttonContents = {
    title: 'Non Dispatch',
    icon: <TextFields />,
    useDispatch: false,
    onClick: () => buttonFuncCalls++
  };
  const button = shallow(generateToolbarButton(buttonContents, mockDispatch));
  button.simulate('click');
  expect(mockDispatch.mock.calls.length).toBe(0);
  expect(buttonFuncCalls).toBe(1);
});

// tests dispatch flag checking on the generateToolbarbutton function
test('Test dispatch button generation and click', () => {
  const mockDispatch = jest.fn(() => 'called through dispatch');

  let buttonFuncCalls = 0;
  const buttonContents = {
    title: 'Dispatch',
    icon: <TextFields />,
    useDispatch: true,
    onClick: () => buttonFuncCalls++
  };
  const button = shallow(generateToolbarButton(buttonContents, mockDispatch));
  button.simulate('click');
  expect(mockDispatch.mock.calls.length).toBe(1);
  expect(buttonFuncCalls).toBe(1);
});
