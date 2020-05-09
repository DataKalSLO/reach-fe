import {
  Box,
  ListItem as CoreListItem,
  ListItemText,
  styled,
  SvgIcon,
  withStyles
} from '@material-ui/core';
import React from 'react';
import { theme } from '../../theme/theme';

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
        <SvgIconStyleOverride>{props.icon}</SvgIconStyleOverride>
        <ListItemTextStyleOverride primary={props.text} />
      </StyledBox>
    </CoreListItem>
  );
}

// When list item does NOT have a primarylabel (i.e. icons only list),
// removes default paddingRight so icons can be centered
const SvgIconStyleOverride = withStyles({
  root: {
    margin: '0px',
    color: theme.palette.text.secondary
  }
})(SvgIcon);

// When list item DOES have a primarylabel (i.e. icons with labels list),
// adds padding between icon and primarylabel
const ListItemTextStyleOverride = withStyles({
  root: {
    paddingLeft: '20px'
  }
})(ListItemText);

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: '10px',
  paddingRight: '10px'
});
