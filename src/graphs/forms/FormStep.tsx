import React, { Fragment, ReactNode } from 'react';

interface Props {
  step: number;
  children: ReactNode[];
}

export function FormStep(props: Props) {
  return (
    <Fragment>
      {props.children.filter((child, index) => {
        return (index === props.step) ? child :null;
      })}
    </Fragment>
  );
}
