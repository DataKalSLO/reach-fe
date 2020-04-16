import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import * as prebuilt from './prebuilt-options';
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
export function IndustryStatsGraph() {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={prebuilt.statsOfBusinessGraphOptions}
    />
  );
}

// DoD contracts
export function defenseGraph() {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={prebuilt.defenseGraphOptions}
    />
  );
}

/*
 * Demographics Related Graphs
 */

// Median Household Income
export function MedianIncomeGraph() {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={prebuilt.medianIncomeGraphOptions}
    />
  );
}

// Income Inequality
export function IncomeInequalityGraph() {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={prebuilt.incomeInequalityGraphOptions}
    />
  );
}

// Real Mean Wages
export function RealMeanWagesGraph() {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={prebuilt.wagesGraphOptions}
    />
  );
}

/*
 * Assets Related Graphs
 */

// Miles Traveled
export function MilesTraveledGraph() {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={prebuilt.milesTraveledGraphOptions}
    />
  );
}

// Airports
export function AirportsGraph() {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={prebuilt.airportsGraphOptions}
    />
  );
}

/*
 * Education Related Graphs
 */

// High School Graduates
export function HighSchoolGraph() {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={prebuilt.highschoolGraphOptions}
    />
  );
}

// College Graduates
export function CollegeGraph() {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={prebuilt.collegeGraduatesGraphOptions}
    />
  );
}

/*
 * Housing Related Graphs
 */

// Median List Price
export function MedianListGraph() {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={prebuilt.medianListGraphOptions}
    />
  );
}

// College Graduates
export function MedianSaleGraph() {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={prebuilt.medianSaleGraphOptions}
    />
  );
}
