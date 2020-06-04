import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../theme/theme';
import { ColumnSelectorProps } from './types';
import { updateSelectedColumn } from '../redux/map/actions';
import { getSelectedColumn } from '../redux/map/selector';

// this function creates the multi-seletion autocomplete component
export default function ColumnSelector(props: ColumnSelectorProps) {
  const { columnNames } = props;
  const dispatch = useDispatch();
  const selectedColumn = useSelector(getSelectedColumn);

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
          label="Column"
          {...params}
          variant="outlined"
          fullWidth
          style={{ marginTop: theme.spacing(0.2) }}
        />
      )}
    />
  );
}
