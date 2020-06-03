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

const TOOLTIP_ELEVATION = 3;

interface TooltipProps {
  selectedColumn: string;
  value: string;
  geoName: string;
}

// The tooltip for the heat map (distinct from "popups" in MarkerPopups.tsx)
export default function Tooltip(props: TooltipProps) {
  const { selectedColumn, value, geoName } = props;
  const parsedValue = parseInt(value);
  const cities = correspondingCities(geoName);
  return (
    <TooltipCard elevation={TOOLTIP_ELEVATION}>
      <CardContent>
        <TooltipTypography variant="body1">
          {geoName + (cities ? ` - (${cities})` : '')}
        </TooltipTypography>
        <TooltipTypography variant="body1">
          {`${selectedColumn}: ${parsedValue ? addCommas(parsedValue) : value}`}
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
