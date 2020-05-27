import {
  Box,
  Divider,
  Grid,
  Paper,
  styled,
  Tab,
  Tabs
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TabPanel from '../../common/components/FormTab';
import { updateLocalGraph } from '../../redux/graphbuilder/actions';
import { Graph, GraphMetaData } from '../../redux/graphbuilder/types';
import { getVizbuilder } from '../../redux/vizbuilder/selector';
import { theme } from '../../theme/theme';
import { SeriesConfiguration } from '../builder/types';
import { DataForm } from './DataForm';
import { EditFormFooter } from './EditFormFooter';
import FormattingForm from './FormattingForm';
import { GraphDataFormState, GraphFormProps } from './types';
import {
  convertDataSourcesToFormDataState,
  convertFormDataStateToDataSources
} from './utilities';

export default function GraphEditForm({ graph, index }: GraphFormProps) {
  const dispatch = useDispatch();
  const vizState = useSelector(getVizbuilder);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [graphState, setGraphState] = useState<GraphMetaData>({
    ...graph.graphMetaData
  });
  const [seriesState, setSeriesState] = useState<SeriesConfiguration[]>([
    ...graph.graphMetaData.graphOptions.seriesConfigs
  ]);
  const [dataState, setDataState] = useState<GraphDataFormState>(
    convertDataSourcesToFormDataState(graph.graphMetaData.dataSources)
  );

  const handleCancel = () => {
    return;
  };

  const FormattingFormHandleReset = () => {
    setGraphState({ ...graph.graphMetaData });
  };
  const FormattingFormHandleUpdate = () => {
    dispatch(updateLocalGraph({ ...graph, graphMetaData: graphState }));
  };

  const DataFormHandleReset = () => {
    setDataState(
      convertDataSourcesToFormDataState(graph.graphMetaData.dataSources)
    );
  };

  const DataFormHandleUpdate = () => {
    const newGraph: Graph = {
      ...graph,
      graphMetaData: {
        ...graph.graphMetaData,
        dataSources: convertFormDataStateToDataSources(dataState),
        graphOptions: {
          ...graph.graphMetaData.graphOptions,
          seriesConfigs: seriesState
        }
      }
    };
    dispatch(updateLocalGraph(newGraph));
  };

  const handleTabChange = (
    event: React.ChangeEvent<{}>,
    selectedIndex: number
  ) => {
    setSelectedIndex(selectedIndex);
  };

  return (
    <FormBox>
      <Paper variant="outlined">
        <Tabs
          value={selectedIndex}
          variant="fullWidth"
          TabIndicatorProps={{ style: { display: 'none' } }}
          onChange={handleTabChange}
        >
          <FormTab label="Formatting" />
          <FormTab label="Data Sources" />
        </Tabs>
      </Paper>
      <Divider light />
      <FormGrid>
        <TabPanel value={selectedIndex} index={0}>
          <FormattingForm state={graphState} setState={setGraphState}>
            <EditFormFooter
              handleCancel={handleCancel}
              handleReset={FormattingFormHandleReset}
              handleUpdate={FormattingFormHandleUpdate}
            />
          </FormattingForm>
        </TabPanel>
        <TabPanel value={selectedIndex} index={1}>
          <DataForm
            metaData={vizState.metadataForAllDatasets}
            dataState={dataState}
            seriesState={seriesState}
            setDataState={setDataState}
            setSeriesState={setSeriesState}
          >
            <EditFormFooter
              handleCancel={handleCancel}
              handleReset={DataFormHandleReset}
              handleUpdate={DataFormHandleUpdate}
            />
          </DataForm>
        </TabPanel>
      </FormGrid>
    </FormBox>
  );
}

const FormBox = styled(Box)({
  width: '100%',
  height: '80%',
  overflow: 'hidden'
});

const FormGrid = styled(Grid)({
  width: '100%',
  height: '100%',
  overflowY: 'scroll'
});

const FormTab = styled(Tab)({
  '&.Mui-selected': {
    borderBottom: `2px solid ${theme.palette.primary.main}`
  }
});
