import { Chip, Paper, styled } from '@material-ui/core';
import React from 'react';
import { theme } from '../theme/theme';
import { NO_DATA } from './constants';
import { ChipLegendProps, MarkerSelection } from './MapTypes';

// TODO: move this legend to bottom and adjust width dynamically
export const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  width: 250,
  justifyContent: 'center',
  flexWrap: 'wrap',
  margin: theme.spacing(0.5),
  padding: theme.spacing(0.3)
});

export const StyledChip = styled(Chip)({
  margin: theme.spacing(0.5)
});

export function ChipLegend(props: ChipLegendProps) {
  const {
    valueKey,
    heatMapSelection,
    colorAssociation,
    markerSelection
  } = props;
  const legendData: {
    key: number;
    label: string;
    color: string;
  }[] = [];
  if (valueKey !== NO_DATA) {
    const heatMapLegend = {
      key: legendData.length,
      label: heatMapSelection.name + ' (' + heatMapSelection.vintage + ')',
      color: 'green'
    };
    legendData.push(heatMapLegend);
  }
  if (
    Object.keys(colorAssociation).length === Object.keys(markerSelection).length
  ) {
    markerSelection.forEach((selection: MarkerSelection) => {
      const markerLegend = {
        key: legendData.length,
        label: selection.name + ' (' + selection.vintage + ')',
        color: colorAssociation[selection.name].color
      };
      legendData.push(markerLegend);
    });
  }

  return (
    <StyledPaper>
      <div>Legend:</div>
      {legendData.map(data => {
        return (
          <StyledChip
            key={data.key}
            label={data.label}
            style={{ borderColor: data.color }}
            variant="outlined"
          />
        );
      })}
    </StyledPaper>
  );
}
