import {
  Paper,
  Card,
  CardContent,
  Typography,
  styled
} from '@material-ui/core';
import React from 'react';
import { LegendProps, MarkerSelection } from './MapTypes';
import { theme } from '../theme/theme';

const StylePaper = styled(Paper)({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: theme.spacing(0.5),
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
});

const StyleCard = styled(Card)({
  display: 'inline-block',
  margin: theme.spacing(0.5)
});

const StyleCardContent = styled(CardContent)({
  padding: theme.spacing(0.5),
  '&:last-child': {
    paddingBottom: theme.spacing(0.5)
  }
});

export function Legend(props: LegendProps) {
  const { heatMapSelection, colorAssociation, markerSelection } = props;

  const legendData: {
    key: number;
    label: string;
    vintage: string;
    source: string;
    color: string;
  }[] = [];
  if (heatMapSelection.name !== undefined) {
    const prefix = 'https://www.';
    const link = prefix.concat(heatMapSelection.source);
    const heatMapLegend = {
      key: legendData.length,
      label: heatMapSelection.name,
      vintage: heatMapSelection.vintage,
      source: link,
      color: 'green'
    };
    legendData.push(heatMapLegend);
  }
  if (
    Object.keys(colorAssociation).length === Object.keys(markerSelection).length
  ) {
    markerSelection.forEach((selection: MarkerSelection) => {
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

  return (
    <StylePaper elevation={0}>
      <Typography variant="caption" color="textSecondary" display="block">
        Legend
      </Typography>
      {legendData.map(data => {
        return (
          <StyleCard
            key={data.key}
            variant="outlined"
            style={{ borderColor: data.color }}
          >
            <StyleCardContent>
              <Typography variant="body2" display="block">
                {' '}
                {data.label}{' '}
              </Typography>
              <Typography variant="caption" display="block">
                Vintage: {data.vintage}
              </Typography>
              <Typography variant="caption" display="block">
                Source:{' '}
                {
                  <a
                    href={data.source}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {data.source}
                  </a>
                }
              </Typography>
            </StyleCardContent>
          </StyleCard>
        );
      })}
    </StylePaper>
  );
}
