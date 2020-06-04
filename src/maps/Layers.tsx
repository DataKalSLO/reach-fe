// Multiple Value Autocomplete: https://material-ui.com/components/autocomplete/
// Used for selection box, shows chip based on search and allows user to delete
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FilterOptionsState } from '@material-ui/lab/useAutocomplete';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Selection } from '../api/vizbuilder/types';
import {
  deleteMarkerSelection,
  getFeatureCollection,
  updateHeatMapSelection,
  updateSelectedColumn,
  updateSelectedTables
} from '../redux/map/actions';
import {
  getDatasetTableNames,
  getAllMetaData
} from '../redux/vizbuilder/selector';
import {
  getHeatMapSelection,
  getSelectedTables,
  getMarkerSelection
} from '../redux/map/selector';
import { theme } from '../theme/theme';
import { removeMarker } from './LayersHelpers';
import { HeatMapSelection } from './types';

// sizing for autocomplete which controls layers selection
const AUTOCOMPLETE_MIN_HEIGHT = '55px';
const AUTOCOMPLETE_MIN_WIDTH = '75px';

// sizing for Box that contains the autocomplete
const BOX_MIN_WIDTH = '75%';

// this function creates the multi-seletion autocomplete component
export default function Layers() {
  const dispatch = useDispatch();
  const tableNames = useSelector(getDatasetTableNames);
  const heatMapSelection = useSelector(getHeatMapSelection);
  const selectedTables = useSelector(getSelectedTables);
  const markerSelection = useSelector(getMarkerSelection);
  const metadataForAllDatasets = useSelector(getAllMetaData);

  const heatMapIsSelected = Object.keys(heatMapSelection).length > 0;

  const diffElem = (l1: any, l2: any) =>
    l1.filter((e1: any) => !l2.includes(e1))[0];

  const updateSelections = (event: any, value: Selection[] | null) => {
    let newSelections = value;
    if (newSelections === null) return;
    let changed: Selection;

    // removed selections
    if (selectedTables.length > newSelections.length) {
      changed = diffElem(selectedTables, newSelections);
      if (changed.geoType === 'area') {
        dispatch(updateHeatMapSelection({}));
      } else {
        dispatch(deleteMarkerSelection(removeMarker(changed, markerSelection)));
      }
    }

    // added selections
    else {
      changed = diffElem(newSelections, selectedTables);
      getFeatureCollection(changed.tableName, changed.geoType)(dispatch);
      if (changed.geoType === 'area') {
        const columnNames = metadataForAllDatasets.filter(
          meta => meta.tableName === changed.tableName
        )[0].columnNames;
        dispatch(updateSelectedColumn(columnNames[0]));
        if (heatMapIsSelected) {
          newSelections = newSelections.filter(
            selection =>
              selection.tableName !==
              (heatMapSelection as HeatMapSelection).name
          );
        }
      }
    }
    updateSelectedTables(newSelections)(dispatch);
  };

  const filterOptions = (
    options: Selection[],
    state: FilterOptionsState<Selection>
  ) =>
    options.filter(
      (option: Selection) =>
        option.geoType && JSON.stringify(option).includes(state.inputValue)
    );

  return (
    <StyledBox>
      <Autocomplete
        multiple
        disableListWrap
        id="tags-outlined"
        options={tableNames}
        getOptionLabel={(table: Selection) =>
          table.censusDesc ? table.censusDesc : table.tableName
        }
        value={selectedTables}
        // getOptionDisabled={option =>

        // }
        filterOptions={filterOptions}
        // adjust autocomplete size here, some magic numbers
        style={{
          minWidth: AUTOCOMPLETE_MIN_WIDTH,
          marginTop: theme.spacing(1),
          minHeight: AUTOCOMPLETE_MIN_HEIGHT
        }}
        // getOptionLabel={option => option.name}
        filterSelectedOptions
        // informs the layerSelection variable with the user's selection
        onChange={updateSelections}
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
    </StyledBox>
  );
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minWidth: BOX_MIN_WIDTH,
  alignItems: 'left'
});
