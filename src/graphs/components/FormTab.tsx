import { Box } from '@material-ui/core';
import React, { ReactNode } from 'react';

export interface Props {
  index: string | number;
  value: string | number;
  children: ReactNode;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function TabPanel(props: Props) {
  const { index, value, children, ...other } = props;
  return (
    <div
      role="tabpanel"
      id={`tabpanel-${index}`}
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
