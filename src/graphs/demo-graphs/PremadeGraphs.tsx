import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
exporting(Highcharts);

/*
 *
 * A Set of Premade Graph Components
 *
 */

/*
 *  Industry Related Graphs
 */

// Statistics Of Business
export function StatsOfBusinessGraph() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../predefined-graphs/StateOfBusinesses2016.json');
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

// DoD contracts
export function IndustryStatsGraph() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../predefined-graphs/DoD2018.json');
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

/*
 * Demographics Related Graphs
 */

// Median Household Income
export function MedianIncomeGraph() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../predefined-graphs/MedianHousehold.json');
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

// Income Inequality
export function IncomeInequalityGraph() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../predefined-graphs/IncomeInequality.json');
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

// Real Mean Wages
export function RealMeanWagesGraph() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../predefined-graphs/RealMeanWages.json');
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

/*
 * Assets Related Graphs
 */

// Miles Traveled
export function MilesTraveledGraph() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../predefined-graphs/MilesTraveled.json');
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

// Airports
export function AirportsGraph() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../predefined-graphs/Airports.json');
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

/*
 * Education Related Graphs
 */

// High School Graduates
export function HighSchoolGraph() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../predefined-graphs/PercentHighschool.json');
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

// College Graduates
export function CollegeGraph() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../predefined-graphs/CollegeGraduate.json');
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

/*
 * Housing Related Graphs
 */

// Median List Price
export function MedianListGraph() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../predefined-graphs/MediaListPrice.json');
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

// College Graduates
export function MedianSaleGraph() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../predefined-graphs/MedianSalePrice.json');
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
