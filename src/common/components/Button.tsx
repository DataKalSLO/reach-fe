import { Button as CoreButton } from '@material-ui/core';
import React from 'react';

export type onClickWithEventType = (
  event: React.MouseEvent<HTMLButtonElement>
) => void;

export interface Props {
  edge?: 'start' | 'end' | false; // Adjusts the left and right margins
  label: string;
  onClick: (() => void) | onClickWithEventType;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const generateMargins = (edge: 'start' | 'end' | false) => {
  const defaultWidth = '10px',
    zeroWidth = '0px';
  const margins = {
    marginTop: defaultWidth,
    marginRight: defaultWidth,
    marginBottom: defaultWidth,
    marginLeft: defaultWidth
  };
  switch (edge) {
    case 'start':
      margins.marginLeft = zeroWidth;
      break;
    case 'end':
      margins.marginRight = zeroWidth;
      break;
    default:
      break;
  }
  return margins;
};

export default function Button(props: Props) {
  return (
    // These default settings will be overriden if different props are passed in
    <CoreButton
      variant="contained"
      color="primary"
      style={generateMargins(props.edge ? props.edge : false)}
      {...props}
    >
      {props.label}
    </CoreButton>
  );
}
