import React, { useState } from 'react';
import { configure, shallow } from 'enzyme';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import LayersComponent from './LayersComponent';
import { markerData } from '../common/assets/Local Data/MockMarkerData';

// set up
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      '& > *': {
        margin: theme.spacing(1)
      },
      '& > * + *': {
        marginTop: theme.spacing(3)
      }
    }
  })
);

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init: any) => [init, setState]);

describe('layers component tests', () => {
  test('returns correct selection', async () => {
    const [layerSelection, setLayerSelection] = React.useState([markerData[0]]);
    const defaultProps = {
      layerSelection: layerSelection,
      setLayerSelection: setLayerSelection
    };
    const wrapper = shallow(LayersComponent(defaultProps));
    const event = {
      target: { value: [markerData[1]] }
    };
    setLayerSelection(event.target.value);
    jest.runAllTimers();
    await expect(setState).toHaveBeenCalled();
  });
});
