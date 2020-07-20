import { FormControl, MenuItem, styled, TextField } from '@material-ui/core';
import React from 'react';

export type OccupationDropdownProps = {
  occupation: string;
  setOccupation: React.Dispatch<React.SetStateAction<string>>;
};

// Maps an occupation's database representation to its display representation.
export const OCCUPATIONS_BY_KEY: { [key: string]: string } = {
  '': 'Unspecified',
  policymaker: 'Policymaker',
  // eslint-disable-next-line @typescript-eslint/camelcase
  business_representative: 'Business Representative',
  // eslint-disable-next-line @typescript-eslint/camelcase
  current_homeowner: 'Current Homeowner',
  // eslint-disable-next-line @typescript-eslint/camelcase
  future_homeowner: 'Future Homeowner'
};

export const OccupationDropdown = (props: OccupationDropdownProps) => {
  return (
    <FormControl>
      <StyledTextField
        select
        label="Occupation"
        value={props.occupation}
        variant="outlined"
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
