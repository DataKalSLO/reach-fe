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
import TabPanel from './FormTab';
import { GraphPrebuiltProps } from './types';

//TODO: Append dataset name to graph object
//TODO: Append column names to graph object
//TODO: Assumption: column names given to BEND are in same order as Y-Config
//TODO: make sure y-axis columns are all numbers
//TODO: only show stack options if stack column is given
//TODO: add colors colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
//TODO: add pie chart labels but remove weird positioning
//TODO: disable color picker on pie charts
//TODO: remove bar from options (don't need it)

export default function GraphEditForm({ graph }: GraphPrebuiltProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
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
          variant="fullWidth"
          value={selectedIndex}
          onChange={handleTabChange}
          aria-label="graph edit tabs"
          TabIndicatorProps={{ style: { display: 'none' } }}
        >
          <FormTab label="Formatting" />
          <FormTab label="Data Sources" />
        </Tabs>
      </Paper>
      <Divider light />
      <FormGrid>
        <TabPanel aria-label={'hello'} value={selectedIndex} index={0}>
          <FormattingForm graph={graph} />
        </TabPanel>
        <TabPanel aria-label={'hello'} value={selectedIndex} index={1}>
          <DataForm />
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
