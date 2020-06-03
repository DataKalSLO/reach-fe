import { Box, Divider, Paper, styled, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TabPanel from '../../common/components/FormTab';
import { getGraph, updateLocalGraph } from '../../redux/graphbuilder/actions';
import { Graph } from '../../redux/graphbuilder/types';
import { isLocalGraph } from '../../redux/graphbuilder/utilities';
import { PartialGraphConfigurationWithoutData } from '../../redux/graphs/types';
import { Metadata } from '../../redux/vizbuilder/types';
import { isDateTypeColumn } from '../../redux/vizbuilder/utilities';
import { theme } from '../../theme/theme';
import { SeriesConfiguration } from '../builder/types';
import { DATA_SOURCE_FORM_LABEL, FORMATTING_FORM_LABEL } from './constants';
import { DataSourcesForm } from './DataSourcesForm';
import { FormattingForm } from './FormattingForm';
import { FormEditFooter } from './FormEditFooter';
import { GraphDataFormState } from './types';
import {
  convertDataSourcesToFormDataState,
  convertFormDataStateToDataSources
} from './utilities';

interface Props {
  graph: Graph;
  datasetsMetaData: Metadata[];
  index: number;
  toggleEdit: () => void;
}

export default function GraphEditForm(props: Props) {
  const { graph, datasetsMetaData, index, toggleEdit } = props;
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);

  const [dataState, setDataState] = useState<GraphDataFormState>(
    convertDataSourcesToFormDataState(graph.graphMetaData.dataSources)
  );

  const [seriesState, setSeriesState] = useState<SeriesConfiguration[]>(
    graph.graphMetaData.graphOptions.seriesConfigs
  );

  const [graphOptionsState, setGraphOptionsState] = useState<
    PartialGraphConfigurationWithoutData
  >(graph.graphMetaData.graphOptions);

  const FormattingFormHandleReset = () => {
    dispatch(getGraph(graph.graphMetaData.graphId, index));
  };

  const DataSourceFormHandleReset = () => {
    dispatch(getGraph(graph.graphMetaData.graphId, index));
  };

  const FormattingFormHandleUpdate = () => {
    dispatch(
      updateLocalGraph({
        ...graph,
        graphMetaData: {
          ...graph.graphMetaData,
          graphOptions: graphOptionsState
        }
      })
    );
  };

  const DataSourceFormHandleUpdate = () => {
    dispatch(
      updateLocalGraph({
        ...graph,
        graphMetaData: {
          ...graph.graphMetaData,
          dataSources: convertFormDataStateToDataSources(dataState),
          graphOptions: {
            ...graph.graphMetaData.graphOptions,
            seriesConfigs: seriesState
          }
        }
      })
    );
  };

  const handleTabChange = (
    event: React.ChangeEvent<{}>,
    activeIndex: number
  ) => {
    setActiveIndex(activeIndex);
  };

  return (
    <FormBox>
      <Paper variant="outlined">
        <Tabs
          value={activeIndex}
          variant="fullWidth"
          TabIndicatorProps={{ style: { display: 'none' } }}
          onChange={handleTabChange}
        >
          <FormTab label={DATA_SOURCE_FORM_LABEL} />
          <FormTab label={FORMATTING_FORM_LABEL} />
        </Tabs>
      </Paper>
      <Divider light />
      <TabPanel value={activeIndex} index={0}>
        <DataSourcesForm
          metaData={datasetsMetaData}
          dataState={dataState}
          seriesState={seriesState}
          setDataState={setDataState}
          setSeriesState={setSeriesState}
        >
          <FormEditFooter
            isLocalGraph={isLocalGraph(graph)}
            handleCancel={toggleEdit}
            handleReset={DataSourceFormHandleReset}
            handleUpdate={DataSourceFormHandleUpdate}
          />
        </DataSourcesForm>
      </TabPanel>
      <TabPanel value={activeIndex} index={1}>
        <FormattingForm
          state={graphOptionsState}
          setState={setGraphOptionsState}
          isTimeSeries={isDateTypeColumn(
            dataState.datasetName,
            dataState.xAxisColumnName,
            datasetsMetaData
          )}
        >
          <FormEditFooter
            isLocalGraph={isLocalGraph(graph)}
            handleCancel={toggleEdit}
            handleReset={FormattingFormHandleReset}
            handleUpdate={FormattingFormHandleUpdate}
          />
        </FormattingForm>
      </TabPanel>
    </FormBox>
  );
}

const FormBox = styled(Box)({
  width: '100%',
  height: '80%',
  overflow: 'hidden'
});

const FormTab = styled(Tab)({
  '&.Mui-selected': {
    borderBottom: `2px solid ${theme.palette.primary.main}`
  }
});
