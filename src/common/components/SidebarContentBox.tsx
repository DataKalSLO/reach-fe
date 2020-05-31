import React from 'react';
import { ContentBox } from '../../reach-ui/core';

interface Props {
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// The ContentBox, but with flex settings for priority during dynamic resizing
export default function SidebarContentBox(props: Props) {
  return <ContentBox flexGrow={1} {...props} />;
}
