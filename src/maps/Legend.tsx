import {
  Chip,
  Paper,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core';
import React from 'react';
import { ChipLegendProps, MarkerSelection } from './MapTypes';

//TODO: use mui styled instead of makestyles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'left',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
      '& > *': {
        margin: theme.spacing(0.5)
      }
    },
    chip: {
      margin: theme.spacing(0.5)
    }
  })
);

export function ChipLegend(props: ChipLegendProps) {
  const classes = useStyles();
  const { heatMapSelection, colorAssociation, markerSelection } = props;

  const legendData: {
    key: number;
    label: string;
    color: string;
  }[] = [];
  if (heatMapSelection.name !== undefined) {
    console.log(heatMapSelection);
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
    <Paper className={classes.root} elevation={0}>
      <div> Legend: </div>
      {legendData.map(data => {
        return (
          <Chip
            size="small"
            key={data.key}
            label={data.label}
            style={{ borderColor: data.color }}
            variant="outlined"
          />
        );
      })}
    </Paper>
  );
}
