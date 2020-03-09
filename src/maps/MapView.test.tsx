import React from 'react';
import { configure, shallow } from 'enzyme';
import LayersComponent from './LayersComponent';
import Adapter from 'enzyme-adapter-react-16';

React.useLayoutEffect = React.useEffect;

configure({ adapter: new Adapter() });
