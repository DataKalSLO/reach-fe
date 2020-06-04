import {
  Box,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  fade,
  Link,
  styled,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  getColorAssociation,
  getHeatMapSelection,
  getMarkerSelection
} from '../redux/map/selector';
import { getVizbuilder } from '../redux/vizbuilder/selector';
import { VizState } from '../redux/vizbuilder/types';
import { theme } from '../theme/theme';
import { HEAT_MAP_COLOR } from './constants';
import { ColorAssociation, HeatMapSelection, MarkerSelection } from './types';

// populate legend using data selected in the layers component
// legend has name of data set, color association, vintage, and source of data
// since the color association is handled differently,
// markers and heat maps need to be parsed separately
function populateLegendData(
  heatMapSelection: HeatMapSelection | {},
  colorAssociation: ColorAssociation,
  markerSelection: MarkerSelection[],
  vizBuilderState: VizState,
  legendData: {
    key: number;
    label: string;
    vintage: string;
    source: string;
    color: string;
  }[]
) {
  // add heat map selection to legend if it exists
  if (Object.keys(heatMapSelection).length > 0) {
    const heatMap = heatMapSelection as HeatMapSelection;
    // TODO: once we are using DB instead of local data, the concat below will
    // likely be removed
    const prefix = 'https://www.';
    const link = prefix.concat(heatMap.source);
    if (heatMap.name !== 'no data') {
      const prefix = 'https://www.';
      const link = prefix.concat(heatMap.source);
      const heatMapLegend = {
        key: legendData.length,
        label: displayName(vizBuilderState, heatMap.name),
        vintage: heatMap.vintage,
        source: link,
        color: HEAT_MAP_COLOR
      };
      legendData.push(heatMapLegend);
    }
  }
  // add marker selection to legend data if it exists
  if (
    Object.keys(colorAssociation).length === Object.keys(markerSelection).length
  ) {
    markerSelection.forEach((selection: MarkerSelection) => {
      // TODO: once we are using DB instead of local data, the concat below will
      // likely be removed
      const prefix = 'https://www.';
      const link = prefix.concat(selection.source);
      const markerLegend = {
        key: legendData.length,
        label: selection.name,
        vintage: selection.vintage,
        source: link,
        color: colorAssociation[selection.name].color
      };
      legendData.push(markerLegend);
    });
  }
}

// creates and formats a card for each item in the legend
function getCards(data: {
  key: number;
  label: string;
  vintage: string;
  source: string;
  color: string;
}) {
  return (
    <ExpansionPanel
      key={data.key}
      elevation={0}
      style={{ backgroundColor: fade(data.color, 0.5) }}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body1">{data.label}</Typography>
      </ExpansionPanelSummary>
      <StyledExpansionPanelDetails>
        <Typography variant="body2" display="block">
          Vintage: {data.vintage}
        </Typography>
        <Typography variant="body2" display="block">
          {'Source: '}
          <Link
            href={data.source}
            rel="noopener noreferrer"
            target="_blank"
            color="initial"
          >
            {data.source}
          </Link>
        </Typography>
      </StyledExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default function Legend() {
  const heatMapSelection = useSelector(getHeatMapSelection);
  const colorAssociation = useSelector(getColorAssociation);
  const markerSelection = useSelector(getMarkerSelection);
  const vizBuilderState = useSelector(getVizbuilder);
  const legendData: {
    key: number;
    label: string;
    vintage: string;
    source: string;
    color: string;
  }[] = [];
  populateLegendData(
    heatMapSelection,
    colorAssociation,
    markerSelection,
    vizBuilderState,
    legendData
  );
  // do not render legend component if no data is displayed on map
  if (legendData.length === 0) {
    return null;
  }
  return (
    <Box marginTop={theme.spacing(0.2)} marginBottom={theme.spacing(0.2)}>
      <Typography variant="subtitle1" display="block">
        Legend
      </Typography>
      {legendData.map(
        (data: {
          key: number;
          label: string;
          vintage: string;
          source: string;
          color: string;
        }) => {
          return getCards(data);
        }
      )}
    </Box>
  );
}

function displayName(vizbuilder: VizState, name: string) {
  for (let ind = 0; ind < vizbuilder.datasetTableNames.length; ind++) {
    if (vizbuilder.datasetTableNames[ind].tableName === name) {
      return vizbuilder.datasetTableNames[ind].censusDesc;
    }
  }
  return name;
}

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)({
  display: 'block',
  paddingTop: theme.spacing(0)
});
