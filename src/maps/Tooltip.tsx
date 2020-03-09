import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import { CCSR_CITY_ZIPS } from './constants';

const useStyles = makeStyles({
  card: {
    backgroundColor: 'white'
  },
  tooltipText: {
    textTransform: 'capitalize',
    whiteSpace: 'nowrap'
  }
});

interface TooltipProps {
  value: number;
  zipCode: string;
}

function Tooltip(props: TooltipProps) {
  const { value, zipCode } = props;
  const classes = useStyles();
  return (
    <Card className={classes.card} elevation={3}>
      <CardContent>
        <Typography className={classes.tooltipText} variant="body1">
          {`Value: ${addCommas(value)}`}
        </Typography>
        <Typography className={classes.tooltipText} variant="body1">
          {`Zip Code: ${zipCode} (${correspondingCities(zipCode)})`}
        </Typography>
      </CardContent>
    </Card>
  );
}

function addCommas(x: number) {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
}

// get the cities corresponding with the given zip
function correspondingCities(zip: string) {
  const result = Object.keys(CCSR_CITY_ZIPS).filter((key: string) =>
    CCSR_CITY_ZIPS[key].includes(zip)
  );
  return result.join(', ');
}

export default Tooltip;
