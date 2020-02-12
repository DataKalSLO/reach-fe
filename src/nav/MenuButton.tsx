import React from 'react';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const StyledButton = styled(Button)({
  color: 'white',
  textTransform: 'none'
});

const StyledTypography = styled(Typography)({
  display: 'block',
  color: 'white'
});

export interface MenuButtonProps {
  name: string;
  navigateToRoute(): void;
}

function MenuButton(props: MenuButtonProps) {
  const { name, navigateToRoute } = props;
  return (
    <StyledButton onClick={navigateToRoute}>
      <StyledTypography variant="body1" noWrap>
        {name}
      </StyledTypography>
    </StyledButton>
  );
}

export default MenuButton;
