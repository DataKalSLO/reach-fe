import { Fragment, ReactNode } from 'react';
import React from 'react';

interface Props {
  step: number;
  children: ReactNode[];
}

export function FormCreateStep(props: Props) {
  return (
    <Fragment>
      {props.children.filter((child, index) => {
        if (index === props.step) {
          return child;
        }
        return null;
      })}
    </Fragment>
  );
}
