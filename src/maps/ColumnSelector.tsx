import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedColumn } from '../redux/map/actions';
import { getSelectedColumn } from '../redux/map/selector';
import { theme } from '../theme/theme';
import { ColumnSelectorProps } from './types';

// this function creates the multi-selection autocomplete component
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
