import React from 'react';
import { Typography, styled, Box } from '@material-ui/core';

export const StyledMyStuffHeader = styled(Typography)({
  textAlign: 'left',
  fontWeight: 'bold',
  marginTop: '40px',
  marginLeft: '40px',
  marginBottom: '40px'
});

const StyledBox = styled(Box)({
  textAlign: 'center'
});

function MyStuffLanding() {
  return (
    <StyledBox>
      <StyledMyStuffHeader variant="h4">My Folders</StyledMyStuffHeader>
    </StyledBox>
  );
}

export default MyStuffLanding;
