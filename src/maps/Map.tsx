import { Box, Card, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getColorAssociation,
  getHeatMapSelection,
  getMap,
  getMarkerSelection,
  getSelectedColumn,
  getSelectedMarker
} from '../redux/map/selector';
import { getAllTableNames } from '../redux/vizbuilder/actions';
import { getVizbuilder } from '../redux/vizbuilder/selector';
import ColumnSelector from './ColumnSelector';
import GeoFilter from './GeoFilter';
import Layers from './Layers';
import Legend from './Legend';
import MapView from './MapView';
import { HeatMapSelection } from './types';

// sizing for the box that contains the map
const BOX_WIDTH = '100%';
const BOX_MIN_WIDTH = '350px';
const BOX_HEIGHT = '100%';
const BOX_MAX_WIDTH = '98hw';

// sizing for the card background which contains everything on the map side
const CARD_HEIGHT = '95%';
const CARD_MARGIN = '15px';

// sizing for the map itself
const MAP_HEIGHT = '100%';
const MAP_WIDTH = '97%';
const MAP_MIN_WIDTH = '350px';
const MAP_MARGIN_LEFT = '10px';

function Map() {
  const dispatch = useDispatch();
  const mapState = useSelector(getMap);
  const vizBuilderState = useSelector(getVizbuilder);
  const allMetaData = vizBuilderState.metadataForAllDatasets;

  useEffect(() => {
    getAllTableNames()(dispatch);
  }, [dispatch]);

  let columnNames: string[] = [];

  const selectedHeatMapDatasetName =
    mapState.heatMapSelection &&
    (mapState.heatMapSelection as HeatMapSelection).name;
  if (selectedHeatMapDatasetName) {
    const meta = allMetaData.filter(
      meta => meta.tableName === selectedHeatMapDatasetName
    )[0];
    if (meta) {
      columnNames = meta.columnNames;
    }
  }

  return (
    <StyledBox>
      <StyledCard variant="outlined">
        <StyledMapContainer>
          <Layers
            tableNames={vizBuilderState.datasetTableNames}
            selectedTables={mapState.selectedTables}
            markerSelection={mapState.markerSelection}
            heatMapSelection={mapState.heatMapSelection}
            selectedMarker={mapState.selectedMarker}
            metadataForAllDatasets={vizBuilderState.metadataForAllDatasets}
          />
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <GeoFilter boundSelection={mapState.boundSelection} />
            </Grid>
            <Grid item xs={3}>
              <ColumnSelector
                columnNames={columnNames}
                selectedColumn={mapState.selectedColumn}
              />
            </Grid>
          </Grid>
          <MapView
            markerSelection={useSelector(getMarkerSelection)}
            heatMapSelection={useSelector(getHeatMapSelection)}
            selectedMarker={useSelector(getSelectedMarker)}
            colorAssociation={useSelector(getColorAssociation)}
            selectedColumn={useSelector(getSelectedColumn)}
          />
          <Legend
            heatMapSelection={useSelector(getHeatMapSelection)}
            colorAssociation={useSelector(getColorAssociation)}
            markerSelection={useSelector(getMarkerSelection)}
          />
        </StyledMapContainer>
      </StyledCard>
    </StyledBox>
  );
}

export const StyledBox = styled(Box)({
  width: BOX_WIDTH,
  minWidth: BOX_MIN_WIDTH,
  height: BOX_HEIGHT,
  maxWidth: BOX_MAX_WIDTH
});

export const StyledCard = styled(Card)({
  height: CARD_HEIGHT,
  margin: CARD_MARGIN
});

export const StyledMapContainer = styled(Box)({
  height: MAP_HEIGHT,
  width: MAP_WIDTH,
  minWidth: MAP_MIN_WIDTH,
  marginLeft: MAP_MARGIN_LEFT,
  overflow: 'scroll'
});

export default Map;
