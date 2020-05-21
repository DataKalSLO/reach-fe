import React, { useState, Fragment } from 'react';
import {
  Box,
  styled,
  makeStyles,
  MenuItem,
  Select,
  Checkbox,
  Input,
  ListItemText,
  useTheme,
  Divider
} from '@material-ui/core';
import FormBlock from './FormBlock';
import { FormSelectionField } from './FormSelectionField';
import { Delete } from '@material-ui/icons';
import IconButton from '../../common/components/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Button from '../../common/components/Button';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const datasets = [
  'slo_airports',
  'dod_contracts',
  'covid-19-slo',
  'covid-19-sb',
  'median-income'
];

const columns = ['United', 'American', 'Alaska', 'Month', 'Type'];

interface SeriesProps {
  seriesId: string;
  seriesName: string;
  seriesColumn: string;
}
const DATASET_LABEL = 'Choose a Dataset:';
const X_AXIS_LABEL = 'Choose the X-Axis Data Column:';
const Y_AXIS_LABEL = 'Choose the Y-Axis Data Columns:';
const SERIES_LABEL = 'Series:';
const STACK_LABEL = 'Choose the Stacking Data Column';

function AddColumns() {
  const [dataState, setDataState] = useState({
    dataset: datasets[0],
    xColumn: columns[0],
    stackColumn: 'None',
    yColumns: [
      {
        seriesId: '0',
        seriesName: 'Series 1',
        seriesColumn: columns[0]
      },
      {
        seriesId: '1',
        seriesName: 'Covid-19 Data 2018',
        seriesColumn: columns[1]
      }
    ]
  });

  const [type, setType] = React.useState('');
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleYaxisChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  const handleXAxisColumnChange = (id: string, selectedXAxisColumn: string) => {
    setDataState({ ...dataState, xColumn: selectedXAxisColumn });
  };

  const handleYAxisColumnChange = (id: string, columnName: string) => {
    const newYColumns = dataState.yColumns.map((series: SeriesProps) => {
      if (series.seriesId === id) {
        return { ...series, seriesColumn: columnName };
      }
      return series;
    });
    setDataState({ ...dataState, yColumns: newYColumns });
  };

  const handleStackColumnChange = (id: string, columnName: string) => {
    setDataState({ ...dataState, stackColumn: columnName });
  };

  const handleDeleteYAxisColumn = (id: string) => {
    const newYColumns = dataState.yColumns.filter(
      series => series.seriesId !== id
    );
    setDataState({ ...dataState, yColumns: newYColumns });
  };

  const handleAddYAxisColumn = () => {
    const newYColumn = {
      seriesId: dataState.yColumns.length.toString(),
      seriesName: `Series ${dataState.yColumns.length + 1}`,
      seriesColumn: columns[0]
    };
    setDataState({
      ...dataState,
      yColumns: [...dataState.yColumns, newYColumn]
    });
  };

  //drop down with checked columns option to consider
  const getYAxisList = (label: string) => {
    return (
      <Select
        labelId="select-filled-label"
        id="select-filled"
        multiple
        value={personName}
        onChange={handleYaxisChange}
        input={<Input />}
        renderValue={selected => (selected as string[]).join(', ')}
        MenuProps={MenuProps}
      >
        {columns.map(name => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={personName.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    );
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  return (
    <Fragment>
      <FormBlock label={X_AXIS_LABEL}>
        <FormSelectionField
          fullWidth
          required
          id="Column"
          label="Column"
          value={dataState.xColumn}
          data={columns}
          handleChange={handleXAxisColumnChange}
        />
      </FormBlock>
      <FormDivider light />
      <FormBlock label={Y_AXIS_LABEL}>
        {dataState.yColumns.map(series => {
          return (
            <FormBlock
              label={series.seriesName}
              key={series.seriesId}
              style={{ marginTop: '10px' }}
            >
              <FormSelectionField
                required
                id={series.seriesId}
                label="Column"
                value={series.seriesColumn}
                data={columns}
                style={{ width: '75%' }}
                handleChange={handleYAxisColumnChange}
              />
              <IconButton
                size="small"
                color="default"
                aria-label="Delete"
                icon={<Delete color="error" />}
                onClick={() => handleDeleteYAxisColumn(series.seriesId)}
              />
            </FormBlock>
          );
        })}
      </FormBlock>
      <FormBox>
        <Button
          label="Add Series"
          variant="text"
          color="default"
          aria-label="Add"
          startIcon={<AddIcon color="primary" />}
          onClick={() => handleAddYAxisColumn()}
        />
      </FormBox>
      <FormDivider light />
      <FormBlock label={STACK_LABEL}>
        <FormSelectionField
          fullWidth
          required
          id="stack"
          label="Column"
          value={dataState.stackColumn}
          data={['None', ...columns]}
          handleChange={handleStackColumnChange}
        />
      </FormBlock>
    </Fragment>
  );
}

export default AddColumns;

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '15ch'
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 155
  }
}));

const FormDivider = styled(Divider)({
  margin: '10px 0px 10px 0px'
});
const FormBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  minWidth: '300px'
});
