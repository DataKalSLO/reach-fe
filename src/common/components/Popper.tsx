import { Box, styled, Popper as CorePopper } from '@material-ui/core';
import React from 'react';
import { TOOLBAR_BORDER, theme } from '../../theme/theme';

interface Props {
  open: boolean;
  anchorEl: HTMLElement | null;
  children: React.ReactNode | null;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const Popper = (props: Props) => {
  return (
    <CorePopper
      placement={'bottom-end'}
      modifiers={{
        preventOverflow: {
          enabled: true,
          boundariesElement: 'scrollParent'
        }
      }}
      {...props}
    >
      <StyledBox>{props.children}</StyledBox>
    </CorePopper>
  );
};

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'right',
  background: '#ffffff',
  border: TOOLBAR_BORDER,
  borderRadius: '5px',
  margin: '-10px',
  boxShadow: theme.shadows[1]
});

export default Popper;
