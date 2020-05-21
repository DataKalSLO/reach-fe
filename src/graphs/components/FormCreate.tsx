import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddDataSet from './AddDataSet';
import AddColumns from './AddColumns';
import GraphCreateFormOptions from './GraphCreateFormOptions';
import AddCategoryTypeforGraph from './AddCategoryTypeforGraph';
import { EmptyOptions } from '../prebuilt-graph-options/Empty_Graph';
import { uuid } from 'uuidv4';
import { StyledBox } from '../../stories/text-block/RichTextEditor';

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

const graph = { id: 'a1', options: EmptyOptions };

function getSteps() {
  return [
    'Please select a graph Category',
    'Please select a DataSet from the list bellow to create your chart ',
    'Please select two columns',
    'Please select more options'
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddCategoryTypeforGraph />;
    case 1:
      return <AddDataSet />;
    case 2:
      return <AddColumns />;
    case 3:
      return <GraphCreateFormOptions graph={graph} />;
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
