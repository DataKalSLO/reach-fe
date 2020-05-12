import {
  Box,
  Card,
  CardContent,
  Link,
  Typography,
  styled,
  fade
} from '@material-ui/core';
import React from 'react';
import { MarkerSelection, HeatMapSelection, ColorAssociation } from './types';
import { theme } from '../theme/theme';
import { HEAT_MAP_COLOR } from './constants';

// populate legend using data selected in the layers component
// legend has name of data set, color association, vintage, and source of data
// since the color association is handled differently,
// markers and heat maps need to be parsed separately
function populateLegendData(
  heatMapSelection: HeatMapSelection,
  colorAssociation: ColorAssociation,
  markerSelection: MarkerSelection[],
  legendData: {
    key: number;
    label: string;
    vintage: string;
    source: string;
    color: string;
  }[]
) {
  // add heat map selection to legend if it exists
  if (heatMapSelection.name !== undefined) {
    // TODO: once we are using DB instead of local data, the concat below will
    // likely be removed
    const prefix = 'https://www.';
    const link = prefix.concat(heatMapSelection.source);
    const heatMapLegend = {
      key: legendData.length,
      label: heatMapSelection.name,
      vintage: heatMapSelection.vintage,
      source: link,
      color: HEAT_MAP_COLOR
    };
    legendData.push(heatMapLegend);
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
    <StyledCard
      key={data.key}
      elevation={0}
      style={{ backgroundColor: fade(data.color, 0.5) }}
    >
      <StyledCardContent>
        <Typography variant="body2" display="block">
          {data.label}
        </Typography>
        <Typography variant="caption" display="block">
          Vintage: {data.vintage}
        </Typography>
        <Typography variant="caption" display="block">
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
      </StyledCardContent>
    </StyledCard>
  );
}

interface LegendProps {
  heatMapSelection: HeatMapSelection;
  colorAssociation: ColorAssociation;
  markerSelection: MarkerSelection[];
}

export default function Legend(props: LegendProps) {
  const { heatMapSelection, colorAssociation, markerSelection } = props;

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
    legendData
  );
  // do not render legend component if no data is displayed on map
  if (legendData.length === 0) {
    return null;
  }
  return (
    <StyledBox>
      <Typography variant="caption" color="textSecondary" display="block">
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
    </StyledBox>
  );
}

const StyledBox = styled(Box)({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: theme.spacing(1)
  }
});

const StyledCard = styled(Card)({
  display: 'inline-block',
  margin: theme.spacing(0.5),
  padding: theme.spacing(0.5)
});

const StyledCardContent = styled(CardContent)({
  padding: theme.spacing(1),
  '&:last-child': {
    paddingBottom: theme.spacing(1)
  }
});
