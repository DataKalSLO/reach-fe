import { Box, Divider, styled } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import React, { Fragment, useState } from 'react';
import Button from '../../common/components/Button';
import FormBlock from '../../common/components/FormBlock';
import { TextFieldSelect } from '../../common/components/FormSelectionField';
import IconButton from '../../common/components/IconButton';

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
const X_AXIS_LABEL = 'Choose the X-Axis Data Column:';
const Y_AXIS_LABEL = 'Choose the Y-Axis Data Columns:';
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
  return (
    <Fragment>
      <FormBlock label={X_AXIS_LABEL}>
        <TextFieldSelect
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
              <TextFieldSelect
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
        <TextFieldSelect
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

const FormDivider = styled(Divider)({
  margin: '10px 0px 10px 0px'
});
const FormBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  minWidth: '300px'
});
