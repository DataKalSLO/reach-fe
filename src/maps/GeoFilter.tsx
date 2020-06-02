import { MenuItem, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React from 'react';
import { theme } from '../theme/theme';
import { BoundSelection, SetBoundSelection } from './types';

interface GeoFilterProps {
  boundSelection: BoundSelection;
  setBoundSelection: SetBoundSelection;
}

// TODO: get coordinates for other bound types, change outlines according to button clicked

// The geofilter button manipulates the bounds and heat map displayed by zip
// code, communities, and region.
export default function GeoFilter(props: GeoFilterProps) {
  // when we have coordinates for different boundaries, we can pass those in here
  // const { boundSelection } = props;
  const region = 'Region';
  const communities = 'Communities';
  const zipcodes = 'Zip Codes';

  return (
    <StyledTextField
      id="boundary-selection"
      select
      label="Boundaries"
      variant="outlined"
      value={zipcodes}
      onChange={() => alert('Not implemented')}
    >
      <MenuItem value={region}>Region</MenuItem>
      <MenuItem value={communities}>Communities</MenuItem>
      <MenuItem value={zipcodes}>Zip Codes</MenuItem>
    </StyledTextField>
  );
}

const StyledTextField = styled(TextField)({
  paddingRight: theme.spacing(1),
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5)
});
