import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch } from 'react-redux';
import { theme } from '../theme/theme';
import { ColumnSelectorProps } from './types';
import { updateSelectedColumn } from '../redux/map/actions';

// this function creates the multi-seletion autocomplete component
export default function ColumnSelector(props: ColumnSelectorProps) {
  const { columnNames, selectedColumn } = props;
  const dispatch = useDispatch();

  const update = (event: ChangeEvent<{}>, value: any) =>
    dispatch(updateSelectedColumn(value));

  return (
    <Autocomplete
      disableListWrap
      options={columnNames}
      value={selectedColumn}
      filterSelectedOptions
      onChange={update}
      renderInput={params => (
        <TextField
          label="Layers"
          {...params}
          variant="outlined"
          fullWidth
          style={{ marginTop: theme.spacing(0.2) }}
        />
      )}
    />
  );
}
