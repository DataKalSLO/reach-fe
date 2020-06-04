import { Card, Paper, styled, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../common/components/IconButton';
import {
  createLocalGraph,
  toggleCreateGraph
} from '../../redux/graphbuilder/actions';
import { PartialGraphConfigurationWithoutData } from '../../redux/graphs/types';
import { getUser } from '../../redux/login/selectors';
import { Metadata } from '../../redux/vizbuilder/types';
import { GRAPH_COLORS } from '../builder/constants';
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
  const [category, setCategory] = useState(NONE);

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
    setGraphState({
      ...graph.graphOptions,
      seriesConfigs: seriesState.map((series, index) => {
        // reset colors to default when the data sources update
        return { ...series, color: GRAPH_COLORS[index] };
      })
    });
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

  const handleCreate = () => {
    const graphCategory = category === NONE ? undefined : category;
    dispatch(
      createLocalGraph(
        {
          graphId: '', // not initialized for local graphs
          userId: '', // not initialized for local graphs
          userName: '', // not initialized for local graphs
          timestamp: 0, // not initialized for local graphs
          snapshotUrl: '', // not initialized for local graphs
          graphTitle: graphState.title,
          dataSources: convertFormDataStateToDataSources(dataState),
          graphOptions: graphState
        },
        graphCategory
      )
    );
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
          label={CATEGORY_CREATE_LABEL}
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
            handleNext={handleCreate}
          />
        </FormPaper>
      )}
    </FormCard>
  );
}

const FormCard = styled(Card)({
  position: 'relative',
  width: '85%',
  minWidth: '300px',
  maxWidth: 'calc(100vw/2.2)'
});

const FormPaper = styled(Paper)({
  margin: '0px 0px 20px 20px'
});

const CancelButton = styled(IconButton)({
  position: 'absolute',
  right: 0
});
