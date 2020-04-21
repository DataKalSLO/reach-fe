import {
  Paper,
  makeStyles,
  createStyles,
  Theme,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import React from 'react';
import { LegendProps, MarkerSelection } from './MapTypes';

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
    card: {
      display: 'flex'
    },
    cardContent: {
      padding: theme.spacing(0.5),
      '&:last-child': {
        paddingBottom: theme.spacing(0.5)
      }
    },
    paperTitle: {
      fontSize: 12
    },
    title: {
      fontSize: 14
    },
    subtitle: {
      fontSize: 10
    }
  })
);

export function Legend(props: LegendProps) {
  const classes = useStyles();
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
    <Paper className={classes.root} elevation={0}>
      <Typography
        className={classes.paperTitle}
        color="textSecondary"
        gutterBottom
      >
        Legend
      </Typography>
      {legendData.map(data => {
        return (
          <Card
            className={classes.card}
            key={data.key}
            variant="outlined"
            style={{ borderColor: data.color }}
          >
            <CardContent className={classes.cardContent}>
              <Typography className={classes.title}> {data.label} </Typography>
              <Typography className={classes.subtitle}>
                Vintage: {data.vintage}
              </Typography>
              <Typography className={classes.subtitle}>
                Source: {<a href={data.source}>{data.source}</a>}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Paper>
  );
}
