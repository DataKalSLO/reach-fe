import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { StyledBox } from '../../stories/text-block/RichTextEditor';
import AddCategoryType from './AddCategorytype';
import AddColumns from './AddColumns';
import AddDataSet from './AddDataSets';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    actionsContainer: {
      marginBottom: theme.spacing(2)
    },
    resetContainer: {
      padding: theme.spacing(3)
    }
  })
);

const [StepperState, setStepperState] = useState
({
    graphCategory: '',
    datasetName: '',
    XAxis: '',
    YAxis: [],
    graphOption: 
    {
      title: '',
      subtitle: '',
      allow_3d: false,
      dataLabels: false,
      xAxis: 
      { 
        name: '',
        prefix: '',
        suffix: ''
      },
      yAxis: 
      {
        title:' ',
        name: ' ',
        prefix: ' ',
        suffix: ' ',
        color: ' '
      },
      stack: 
      { 
        name: '',
        type: ''
      }
    }
  }
);

function getSteps() {
  return [
    'Please select a graph Category',
    'Please select a DataSet from the list bellow to create your chart ',
    'Please select two columns',
    //'Please select more options'
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddCategoryType />;
    case 1:
      return <AddDataSet />;
    case 2:
      return <AddColumns />;
    default:
      return 'Unknown step';
  }
}

export default function FormCreate() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <StyledBox>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1
                        ? 'Create Graph'
                        : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    </StyledBox>
  );
}
