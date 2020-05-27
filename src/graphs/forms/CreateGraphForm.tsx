import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Graph } from '../../redux/graphbuilder/types';
import { emptyGraph } from './EmptyGraph';

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

function getSteps() {
  return [
    'Please select a graph Category',
    'Please select a DataSet from the list bellow to create your chart ',
    'Please select two columns'
    //'Please select more options'
  ];
}

export default function FormCreate() {
  const classes = useStyles();
  const steps = getSteps();
  const [activeStep, setActiveStep] = React.useState(0);
  const [graphState, setGraphState] = useState(emptyGraph);

  const handleCategoryChange = (category: string) => {
    return;
  };

  const handleFormCancel = (index: number) => {
    return setGraphState(emptyGraph);
  };
  //  const handleFormUpdate = (graph: Graph) => {
  //    setGraphState(graph);
  //  };

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
    <div>hello</div>
    /*
    <StyledBox>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>
                  <FormStep step={activeStep}>
                    <AddCategoryType
                      category="HEALTH"
                      handleChange={handleCategoryChange}
                    />
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
                </Typography>
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
        */
  );
}
