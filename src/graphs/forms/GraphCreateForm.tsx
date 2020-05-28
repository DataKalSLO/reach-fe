import { Card, Paper, styled, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../common/components/IconButton';
import { saveGraph, toggleCreateGraph } from '../../redux/graphbuilder/actions';
import { HEALTH } from '../../redux/graphs/constants';
import { PartialGraphConfigurationWithoutData } from '../../redux/graphs/types';
import { getUser } from '../../redux/login/selectors';
import { Metadata } from '../../redux/vizbuilder/types';
import { SeriesConfiguration } from '../builder/types';
import {
  CATEGORY_CREATE_LABEL,
  createFooterLabels,
  createFormSteps,
  FINISH_STEP_LABEL,
  INPUT_CATEGORY_LABEL,
  NONE,
  stepFooterLabels,
  supportedInitiativeTypes
} from './constants';
import { DataSourcesForm } from './DataSourcesForm';
import { FormattingForm } from './FormattingForm';
import { FormCreateFooter } from './FormCreateFooter';
import { FormDataSelection } from './FormDataSelection';
import { FormStepper } from './FormStepper';
import { GraphDataFormState, InitialGraphCreationState } from './types';
import {
  convertDataSourcesToFormDataState,
  convertFormDataStateToDataSources,
  isAdmin
} from './utilities';

interface Props {
  graph: InitialGraphCreationState;
  datasetsMetaData: Metadata[];
}

export function GraphCreateForm(props: Props) {
  const { graph, datasetsMetaData } = props;
  const dispatch = useDispatch();
  const userInfo = useSelector(getUser);

  const [activeStep, setActiveStep] = useState(0);
  const [category, setCategory] = useState(HEALTH);

  const [seriesState, setSeriesState] = useState<SeriesConfiguration[]>(
    graph.graphOptions.seriesConfigs
  );

  const [dataState, setDataState] = useState<GraphDataFormState>(
    convertDataSourcesToFormDataState(graph.dataSources)
  );

  const [graphState, setGraphState] = useState<
    PartialGraphConfigurationWithoutData
  >(graph.graphOptions);

  const DataFormHandleUpdate = () => {
    setGraphState({ ...graph.graphOptions, seriesConfigs: seriesState });
    setActiveStep(activeStep + 1);
  };

  const handleCategoryChange = (initiative: string) => {
    setCategory(initiative);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleSave = () => {
    dispatch(
      saveGraph({
        graphId: null,
        graphCategory:
          isAdmin(userInfo.role) && category !== NONE ? category : null,
        graphTitle: graphState.title,
        dataSources: convertFormDataStateToDataSources(dataState),
        graphOptions: graphState,
        graphSVG: ''
      })
    );
    dispatch(toggleCreateGraph());
  };

  /*
   * If the user is an admin, enable the initiative form selection, else
   * remove this step from the form
   */
  const createSteps = isAdmin(userInfo.role)
    ? createFormSteps
    : createFormSteps.slice(0, createFormSteps.length - 1);

  return (
    <FormCard variant="outlined">
      <CancelButton
        color="default"
        aria-label="Delete"
        icon={<CloseIcon color="error" />}
        onClick={() => dispatch(toggleCreateGraph())}
      />
      <FormStepper steps={createSteps} activeStep={activeStep}>
        <DataSourcesForm
          metaData={datasetsMetaData}
          dataState={dataState}
          seriesState={seriesState}
          setDataState={setDataState}
          setSeriesState={setSeriesState}
        >
          <FormCreateFooter
            labels={stepFooterLabels}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={DataFormHandleUpdate}
          />
        </DataSourcesForm>
        <FormattingForm state={graphState} setState={setGraphState}>
          <FormCreateFooter
            labels={stepFooterLabels}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </FormattingForm>
        <FormDataSelection
          label={''}
          inputLabel={INPUT_CATEGORY_LABEL}
          value={category}
          data={supportedInitiativeTypes}
          handleChange={handleCategoryChange}
        >
          <FormCreateFooter
            labels={stepFooterLabels}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </FormDataSelection>
      </FormStepper>
      {activeStep === createSteps.length && (
        <FormPaper square elevation={0}>
          <Typography>{FINISH_STEP_LABEL}</Typography>
          <FormCreateFooter
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
  height: '100%',
  margin: '0px 0px 20px 20px'
});

const CancelButton = styled(IconButton)({
  position: 'absolute',
  right: 0
});
