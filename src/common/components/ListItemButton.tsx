import {
  Box,
  ListItem as CoreListItem,
  ListItemIcon,
  ListItemText,
  styled
} from '@material-ui/core';
import React from 'react';

interface Props {
  icon: JSX.Element;
  text: string;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function ListItemButton(props: Props) {
  return (
    <CoreListItem button aria-label={props.text} key={props.text} {...props}>
      <StyledBox>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
      </StyledBox>
    </CoreListItem>
  );
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: '10px',
  paddingRight: '10px'
});
