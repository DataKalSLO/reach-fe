import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { styled } from '@material-ui/core/styles';
import React from 'react';
import { theme } from '../theme/theme';
import { GeoFilterComponentProps } from './MapTypes';

const StyleBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'left',
  '& > *': {
    margin: theme.spacing(1)
  }
});

// TODO: get coordinates for other bound types, change outlines according to button clicked

// The geofilter button manipulates the bounds and heat map displayed by zip
// code, communities, and region.
export function GeoFilter(props: GeoFilterComponentProps) {
  const region = 'Region';
  const communities = 'Communities';
  const zipcode = 'Zip Code';

  return (
    <StyleBox>
      {/* button group represents possible bounds to be displayed on map */}
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button className={region} onClick={() => alert('Not implemented')}>
          Region
        </Button>
        <Button
          className={communities}
          onClick={() => alert('Not implemented')}
        >
          Communities
        </Button>
        <Button className={zipcode} onClick={() => alert('Not implemented')}>
          Zip Code
        </Button>
      </ButtonGroup>
    </StyleBox>
  );
}
