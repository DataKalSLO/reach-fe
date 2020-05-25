import {
  Box,
  Divider,
  Grid,
  Paper,
  styled,
  Tab,
  Tabs
} from '@material-ui/core';
import React from 'react';
import { theme } from '../../theme/theme';
import DataForm from './DataForm';
import FormattingForm from './FormattingForm';
import { GraphFormProps } from './types';
import TabPanel from '../../common/components/FormTab';
import { useDispatch } from 'react-redux';
import { updateLocalGraph, editGraph } from '../../redux/graphbuilder/actions';
import { Graph } from '../../redux/graphbuilder/types';

//TODO: add pie chart labels but remove weird positioning
//TODO: disable color picker on pie charts
//TODO: remove bar from options (don't need it)

export default function GraphEditForm({ graph, index }: GraphFormProps) {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleTabChange = (
    event: React.ChangeEvent<{}>,
    selectedIndex: number
  ) => {
    setSelectedIndex(selectedIndex);
  };

  const handleFormCancel = (index: number) => {
    dispatch(editGraph(index));
  };

  const handleFormUpdate = (graph: Graph) => {
    dispatch(updateLocalGraph(graph));
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
          <FormattingForm
            graph={graph}
            index={index}
            handleCancel={handleFormCancel}
            handleUpdate={handleFormUpdate}
          />
        </TabPanel>
        <TabPanel value={selectedIndex} index={1}>
          <DataForm
            graph={graph}
            index={index}
            handleCancel={handleFormCancel}
            handleUpdate={handleFormUpdate}
          />
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
