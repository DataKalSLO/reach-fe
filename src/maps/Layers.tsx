// Multiple Value Autocomplete: https://material-ui.com/components/autocomplete/
// Used for selection box, shows chip based on search and allows user to delete
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { flatten } from 'lodash';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Selection } from '../api/vizbuilder/types';
import kitchenFaciltiesHeatMap from '../common/assets/Local Data/census/b25053.js';
import medianHouseholdIncomeHeatMap from '../common/assets/Local Data/census/median_income_data.js';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import {
  getFeatureCollection,
  updateHeatMapSelection,
  updateMarkerSelection,
  updateSelectedTables
} from '../redux/map/actions';
import { theme } from '../theme/theme';
import { removeMarker } from './LayersHelpers';
import { LayersProps } from './types';

// all of the local data we have available
// TODO: pull this from backend! need distinct split between marker & heat map
const heatMapData = [medianHouseholdIncomeHeatMap, kitchenFaciltiesHeatMap];
// TODO: fix type errors here, can't figure out what it expects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const allData = flatten([markerData as any, heatMapData]);

// this function creates the multi-seletion autocomplete component
export default function Layers(props: LayersProps) {
  const { tableNames, selectedTables, markerSelection } = props;
  const dispatch = useDispatch();

  const diffElem = (l1: any, l2: any) =>
    l1.filter((e1: any) => !l2.includes(e1))[0];

  const updateSelections = (event: any, newSelections: Selection[] | null) => {
    if (newSelections === null) return;
    let changed: Selection;

    // removed
    if (selectedTables.length > newSelections.length) {
      changed = diffElem(selectedTables, newSelections);
      if (changed.geoType === 'area') {
        dispatch(updateHeatMapSelection({}));
      } else {
        dispatch(updateMarkerSelection(removeMarker(changed, markerSelection)));
      }
    }

    // added
    else {
      changed = diffElem(newSelections, selectedTables);
      getFeatureCollection(changed.tableName, changed.geoType)(dispatch);
    }
    updateSelectedTables(newSelections)(dispatch);
    //  getFeatureCollection('b19019_001e')(dispatch);
  };

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
        // TODO: make sure this handles data not existing once we are pulling from DB
        // defaultValue={[allData[0], allData[2]]}
        // disables all options when the user has chosen more than the allowedSelections
        // getOptionDisabled={option =>
        //   handleDisable(allData, markerSelection, heatMapSelection, option)
        // }
        // adjust autocomplete size here, some magic numbers
        style={{
          minWidth: '75px',
          marginTop: theme.spacing(1),
          minHeight: '55px'
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
  minWidth: '75%',
  alignItems: 'left'
});
