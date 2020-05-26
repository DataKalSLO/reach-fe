import {
  Box,
  Paper,
  Stepper,
  Typography,
  Step,
  StepLabel,
  StepContent,
  Card,
  styled
} from '@material-ui/core';
import React, { useState } from 'react';
import { Graph } from '../../redux/graphbuilder/types';
import {
  DATA_STEP_LABEL,
  FINISH_STEP_LABEL,
  FORMAT_STEP_LABEL
} from './constants';
import { emptyGraph } from './EmptyGraph';
import Button from '../../common/components/Button';
import { FormStep } from './FormStep';
import DataForm from './DataForm';
import FormattingForm from './FormattingForm';
import { useDispatch } from 'react-redux';
import { saveGraph, createGraph } from '../../redux/graphbuilder/actions';

export function GraphCreateForm() {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [graphState, setGraphState] = useState(emptyGraph);

  const handleFormCancel = (index: number) => {
    return setGraphState(emptyGraph);
  };

  const handleFormUpdate = (graph: Graph) => {
    setGraphState(graph);
    setActiveStep(activeStep + 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSave = () => {
    dispatch(
      saveGraph({
        graphId: null,
        graphCategory: null,
        graphTitle: graphState.graphMetaData.graphTitle,
        dataSources: graphState.graphMetaData.dataSources,
        graphOptions: graphState.graphMetaData.graphOptions,
        graphSVG: ''
      })
    );
    dispatch(createGraph());
  };

  const steps = [DATA_STEP_LABEL, FORMAT_STEP_LABEL];

  return (
    <Card variant="outlined">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
              <StepContent>
                <FormStep step={activeStep}>
                  <DataForm
                    graph={graphState}
                    index={0}
                    handleCancel={handleFormCancel}
                    handleUpdate={handleFormUpdate}
                  />
                  <FormattingForm
                    graph={graphState}
                    index={0}
                    handleCancel={handleFormCancel}
                    handleUpdate={handleFormUpdate}
                  />
                </FormStep>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length && (
        <FormPaper square elevation={0}>
          <Typography>{FINISH_STEP_LABEL}</Typography>
          <Button
            label="Create Chart"
            variant="contained"
            color="primary"
            onClick={handleSave}
          />
        </FormPaper>
      )}
    </Card>
  );
}

const FormPaper = styled(Paper)({
  margin: '0px 0px 20px 20px'
});
