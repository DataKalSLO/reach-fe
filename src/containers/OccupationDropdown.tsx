import React from 'react';
import { styled, FormControl, MenuItem, TextField } from '@material-ui/core';

export type OccupationDropdownProps = {
  occupation: string;
  setOccupation: React.Dispatch<React.SetStateAction<string>>;
};

// Maps an occupation's database representation to its display representation.
const OCCUPATIONS_BY_KEY: { [key: string]: string } = {
  '': 'Unspecified',                                      /* eslint-disable-line */
  'policymaker': 'Policymaker',                           /* eslint-disable-line */
  'business_representative': 'Business Representative',   /* eslint-disable-line */
  'current_homeowner': 'Current Homeowner',               /* eslint-disable-line */
  'future_homeowner': 'Future Homeowner'                  /* eslint-disable-line */
};

export const OccupationDropdown = (props: OccupationDropdownProps) => {
  return (
    <FormControl>
      <StyledTextField
        select
        label="Occupation"
        value={props.occupation}
        variant="filled"
        margin="dense"
        onChange={event => props.setOccupation(event.target.value as string)}
      >
        {Object.keys(OCCUPATIONS_BY_KEY).map(key => (
          <MenuItem key={key} value={key}>
            {OCCUPATIONS_BY_KEY[key]}
          </MenuItem>
        ))}
      </StyledTextField>
    </FormControl>
  );
};

const StyledTextField = styled(TextField)({
  width: '270px'
});
