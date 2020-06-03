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
      // TODO: make sure this handles data not existing once we are pulling from DB
      // defaultValue={[allData[0], allData[2]]}
      // disables all options when the user has chosen more than the allowedSelections
      // getOptionDisabled={option =>
      //   handleDisable(allData, markerSelection, heatMapSelection, option)
      // }
      // style={{
      //   minWidth: AUTOCOMPLETE_MIN_WIDTH,
      //   marginTop: theme.spacing(1),
      //   minHeight: AUTOCOMPLETE_MIN_HEIGHT
      // }}
      // getOptionLabel={option => option.name}
      filterSelectedOptions
      // informs the layerSelection variable with the user's selection
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
