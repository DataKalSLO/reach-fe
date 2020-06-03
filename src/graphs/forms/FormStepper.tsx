import { Step, StepContent, StepLabel, Stepper } from '@material-ui/core';
import React, { Fragment, ReactNode } from 'react';

interface Props {
  steps: string[];
  activeStep: number;
  children: ReactNode[];
}

export function FormStepper(props: Props) {
  const { steps, activeStep, children } = props;
  return (
    <Fragment>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
              <StepContent>
                {children.filter((child, index) => {
                  return index === activeStep ? child : null;
                })}
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Fragment>
  );
}
