import { Card, Paper, styled, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGraph, saveGraph } from '../../redux/graphbuilder/actions';
import { Graph, GraphMetaData } from '../../redux/graphbuilder/types';
import { getVizbuilder } from '../../redux/vizbuilder/selector';
import { SeriesConfiguration } from '../builder/types';
import {
  createFooterLabels,
  DATA_STEP_LABEL,
  FINISH_STEP_LABEL,
  FORMAT_STEP_LABEL,
  stepFooterLabels,
  steps
} from './constants';
import { CreateFormFooter } from './CreateFormFooter';
import { DataForm } from './DataForm';
import { emptyGraph } from './EmptyGraph';
import FormattingForm from './FormattingForm';
import { FormStepper } from './FormStepper';
import { GraphDataFormState } from './types';
import {
  convertDataSourcesToFormDataState,
  convertFormDataStateToDataSources
} from './utilities';

export function GraphCreateForm() {
  const dispatch = useDispatch();
  const vizState = useSelector(getVizbuilder);
  const [activeStep, setActiveStep] = useState(0);
  const [graph, setGraph] = useState(emptyGraph);
  const [graphState, setGraphState] = useState<GraphMetaData>({
    ...graph.graphMetaData
  });
  const [seriesState, setSeriesState] = useState<SeriesConfiguration[]>([
    ...graph.graphMetaData.graphOptions.seriesConfigs
  ]);

  const [dataState, setDataState] = useState<GraphDataFormState>(
    convertDataSourcesToFormDataState(graph.graphMetaData.dataSources)
  );

  const FormattingFormHandleUpdate = () => {
    setGraph({ ...graph, graphMetaData: { ...graphState } });
    setActiveStep(activeStep + 1);
  };

  const DataFormHandleUpdate = () => {
    const newGraph: Graph = {
      ...graph,
      graphMetaData: {
        ...graph.graphMetaData,
        dataSources: convertFormDataStateToDataSources(dataState),
        graphOptions: {
          ...graph.graphMetaData.graphOptions,
          seriesConfigs: [...seriesState]
        }
      }
    };
    setGraph(newGraph);
    setGraphState({ ...newGraph.graphMetaData });
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
        graphTitle: graph.graphMetaData.graphTitle,
        dataSources: graph.graphMetaData.dataSources,
        graphOptions: graph.graphMetaData.graphOptions,
        graphSVG: ''
      })
    );
    dispatch(createGraph());
  };

  return (
    <Card variant="outlined">
      <FormStepper
        steps={[DATA_STEP_LABEL, FORMAT_STEP_LABEL]}
        activeStep={activeStep}
      >
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
      </FormStepper>
      {activeStep === steps.length && (
        <FormPaper square elevation={0}>
          <Typography>{FINISH_STEP_LABEL}</Typography>
          <CreateFormFooter
            labels={createFooterLabels}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={FormattingFormHandleUpdate}
          />
        </FormPaper>
      )}
    </Card>
  );
}

const FormPaper = styled(Paper)({
  margin: '0px 0px 20px 20px'
});
