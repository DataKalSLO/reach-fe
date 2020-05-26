import { Card, CardContent, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import React from 'react';
import { CCSR_CITY_ZIPS } from './constants';

const TooltipTypography = styled(Typography)({
  textTransform: 'capitalize',
  whiteSpace: 'nowrap'
});

const TooltipCard = styled(Card)({
  backgroundColor: 'white'
});

interface TooltipProps {
  value: number;
  zipCode: string;
}

export default function Tooltip(props: TooltipProps) {
  const { value, zipCode } = props;
  return (
    <TooltipCard elevation={3}>
      <CardContent>
        <TooltipTypography variant="body1">
          {`Value: ${addCommas(value)}`}
        </TooltipTypography>
        <TooltipTypography variant="body1">
          {`Zip Code: ${zipCode} (${correspondingCities(zipCode)})`}
        </TooltipTypography>
      </CardContent>
    </TooltipCard>
  );
}

// formats numbers, for example: 300000000 becomes 300,000,000
function addCommas(x: number): string {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
}

// get the cities corresponding with the given zip
function correspondingCities(zip: string) {
  const result = Object.keys(CCSR_CITY_ZIPS).filter((key: string) =>
    CCSR_CITY_ZIPS[key].includes(zip)
  );
  return result.join(', ');
}
