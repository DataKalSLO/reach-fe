import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { airportsOptions } from '../predefined-graph-options/airports';
import { collegeGraduatesOptions } from '../predefined-graph-options/college-graduates';
import { highschoolOptions } from '../predefined-graph-options/percent-highschool';
import { defenseOptions } from '../predefined-graph-options/dod-2018';
import { statsOfBusinessOptions } from '../predefined-graph-options/state-of-business';
import { incomeInequalityOptions } from '../predefined-graph-options/income-inequality';
import { medianIncomeOptions } from '../predefined-graph-options/median-income';
import { medianListOptions } from '../predefined-graph-options/median-list-price';
import { medianSaleOptions } from '../predefined-graph-options/median-sale-price';
import { milesTraveledOptions } from '../predefined-graph-options/miles-traveled';
import { wagesOptions } from '../predefined-graph-options/real-mean-wages';
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
export function IndustryStatsGraph() {
  return (
    <HighchartsReact highcharts={Highcharts} options={statsOfBusinessOptions} />
  );
}

// DoD contracts
export function defenseGraph() {
  return <HighchartsReact highcharts={Highcharts} options={defenseOptions} />;
}

/*
 * Demographics Related Graphs
 */

// Median Household Income
export function MedianIncomeGraph() {
  return (
    <HighchartsReact highcharts={Highcharts} options={medianIncomeOptions} />
  );
}

// Income Inequality
export function IncomeInequalityGraph() {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={incomeInequalityOptions}
    />
  );
}

// Real Mean Wages
export function RealMeanWagesGraph() {
  return <HighchartsReact highcharts={Highcharts} options={wagesOptions} />;
}

/*
 * Assets Related Graphs
 */

// Miles Traveled
export function MilesTraveledGraph() {
  return (
    <HighchartsReact highcharts={Highcharts} options={milesTraveledOptions} />
  );
}

// Airports
export function AirportsGraph() {
  return <HighchartsReact highcharts={Highcharts} options={airportsOptions} />;
}

/*
 * Education Related Graphs
 */

// High School Graduates
export function HighSchoolGraph() {
  return (
    <HighchartsReact highcharts={Highcharts} options={highschoolOptions} />
  );
}

// College Graduates
export function CollegeGraph() {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={collegeGraduatesOptions}
    />
  );
}

/*
 * Housing Related Graphs
 */

// Median List Price
export function MedianListGraph() {
  return (
    <HighchartsReact highcharts={Highcharts} options={medianListOptions} />
  );
}

// College Graduates
export function MedianSaleGraph() {
  return (
    <HighchartsReact highcharts={Highcharts} options={medianSaleOptions} />
  );
}
