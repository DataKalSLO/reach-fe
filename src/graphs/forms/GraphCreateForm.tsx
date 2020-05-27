import { Card, Paper, styled, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../common/components/IconButton';
import { createGraph, saveGraph } from '../../redux/graphbuilder/actions';
import { PartialGraphConfigurationWithoutData } from '../../redux/graphbuilder/types';
import { getVizbuilder } from '../../redux/vizbuilder/selector';
import { SeriesConfiguration } from '../builder/types';
import {
  createFooterLabels,
  DATA_STEP_LABEL,
  FINISH_STEP_LABEL,
  FORMAT_STEP_LABEL,
  stepFooterLabels,
  formSteps
} from './constants';
import { CreateFormFooter } from './CreateFormFooter';
import { DataForm } from './DataForm';
import { DefaultGraph, generateEmptyGraph } from './defaults';
import FormattingForm from './FormattingForm';
import { FormStepper } from './FormStepper';
import { GraphDataFormState } from './types';
import {
  convertDataSourcesToFormDataState,
  convertFormDataStateToDataSources
} from './utilities';
import AddCategoryType from './AddCategorytype';
import { getUser } from '../../redux/login/selectors';
import { ADMIN_USER } from '../../nav/constants';

export function GraphCreateForm() {
  const dispatch = useDispatch();
  const vizState = useSelector(getVizbuilder);
  const userInfo = useSelector(getUser);
  const [activeStep, setActiveStep] = useState(0);
  const [category, setCategory] = useState('Health');
  const [graph, setGraph] = useState(
    generateEmptyGraph(vizState.metadataForAllDatasets)
  );
  const [graphState, setGraphState] = useState<
    PartialGraphConfigurationWithoutData
  >(graph.graphOptions);
  const [seriesState, setSeriesState] = useState<SeriesConfiguration[]>([
    ...graph.graphOptions.seriesConfigs
  ]);

  const [dataState, setDataState] = useState<GraphDataFormState>(
    convertDataSourcesToFormDataState(graph.dataSources)
  );

  const FormattingFormHandleUpdate = () => {
    setGraph({ ...graph, graphOptions: graphState });
    setGraphState({ ...graph.graphOptions });
    setActiveStep(activeStep + 1);
  };

  const DataFormHandleUpdate = () => {
    const newGraph: DefaultGraph = {
      graphOptions: { ...graph.graphOptions, seriesConfigs: seriesState },
      dataSources: convertFormDataStateToDataSources(dataState)
    };
    setGraph(newGraph);
    setGraphState({ ...newGraph.graphOptions });
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleCategoryChange = (initiative: string) => {
    setCategory(initiative);
  };

  const handleSave = () => {
    dispatch(
      saveGraph({
        graphId: null,
        graphCategory:
          userInfo.role === ADMIN_USER && category !== 'None' ? category : null,
        graphTitle: graph.graphOptions.title,
        dataSources: graph.dataSources,
        graphOptions: graph.graphOptions,
        graphSVG: ''
      })
    );
    dispatch(createGraph());
  };

  const createSteps =
    userInfo.role === ADMIN_USER ? formSteps : formSteps.slice(1);

  return (
    <FormCard variant="outlined">
      <CancelButton
        size="small"
        color="default"
        aria-label="Delete"
        icon={<CloseIcon color="error" />}
        onClick={() => dispatch(createGraph())}
      />
      <FormStepper steps={createSteps} activeStep={activeStep}>
        <DataForm
          metaData={vizState.metadataForAllDatasets}
          dataState={dataState}
          seriesState={seriesState}
          setDataState={setDataState}
          setSeriesState={setSeriesState}
        >
          <CreateFormFooter
            labels={stepFooterLabels}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={DataFormHandleUpdate}
          />
        </DataForm>
        <FormattingForm state={graphState} setState={setGraphState}>
          <CreateFormFooter
            labels={stepFooterLabels}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={FormattingFormHandleUpdate}
          />
        </FormattingForm>
        <AddCategoryType
          category={category}
          handleChange={handleCategoryChange}
        >
          <CreateFormFooter
            labels={stepFooterLabels}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </AddCategoryType>
      </FormStepper>
      {activeStep === createSteps.length && (
        <FormPaper square elevation={0}>
          <Typography>{FINISH_STEP_LABEL}</Typography>
          <CreateFormFooter
            labels={createFooterLabels}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleSave}
          />
        </FormPaper>
      )}
    </FormCard>
  );
}

const FormCard = styled(Card)({
  position: 'relative'
});

const FormPaper = styled(Paper)({
  margin: '0px 0px 20px 20px'
});

const CancelButton = styled(IconButton)({
  position: 'absolute',
  right: 0
});
