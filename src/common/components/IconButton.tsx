import { IconButton as CoreIconButton, styled } from '@material-ui/core';
import React from 'react';

interface Props {
  'aria-label': string; // Accessible label that describes button's purpose
  icon: React.ReactNode;
  onClick: (e?: React.MouseEvent) => void;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const IconButton = (props: Props) => {
  // These default settings will be overriden if different props are passed in
  return (
    <PaddedIconButton
      aria-label={props['aria-label']}
      color="primary"
      {...props}
    >
      {props.icon}
    </PaddedIconButton>
  );
};

export { IconButton };

const PaddedIconButton = styled(CoreIconButton)({
  margin: '10px'
});
