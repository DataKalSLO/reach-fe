import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMap } from '../redux/map/selector';
import { getVizbuilder } from '../redux/vizbuilder/selector';
import { Box, Card } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import GeoFilter from './GeoFilter';
import Layers from './Layers';
import Legend from './Legend';
import MapView from './MapView';
import { getAllTableNames } from '../redux/vizbuilder/actions';

// TODO: save to stories

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

  useEffect(() => {
    getAllTableNames()(dispatch);
  }, [dispatch]);

  console.log(mapState);
  console.log(vizBuilderState);

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
          />
          <GeoFilter boundSelection={mapState.boundSelection} />
          <MapView
            markerSelection={mapState.markerSelection}
            heatMapSelection={mapState.heatMapSelection}
            selectedMarker={mapState.selectedMarker}
            colorAssociation={mapState.colorAssociation}
          />
          <Legend
            heatMapSelection={mapState.heatMapSelection}
            colorAssociation={mapState.colorAssociation}
            markerSelection={mapState.markerSelection}
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
