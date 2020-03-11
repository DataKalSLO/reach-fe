import Highcharts from 'highcharts';
import Graph from '../builder/graph';
import { GraphCombinedTypes } from '../builder/types';
import { Column } from '../../redux/vizbuilder/types';

/*
 * The following type aliases/interfaces represent the props that
 * are passed down to the generic Graph component. A Graph component
 * essentially needs to be given a type (GraphType), and the series
 * type (SeriesType) and data ([Column, ValueColumn]) for each
 * series that is passed to it. A series is simply one set of data
 * points on a chart.
 * - see https://api.highcharts.com/class-reference/Highcharts.Series
 *    for more information about series
 */

/* props type passed into main Graph component */
/* e.g. <Graph graphData={graphData} /> */
export interface GraphProps {
  graphData: GraphData;
}

/* props type passed into the children of Graph */
/* the children are more specific Graph components */
/* e.g. <GraphSync graph={graphs} highchartsType={highchartsType} /> */
export interface GraphChildrenProps {
  graphs: Graph[];
  highchartsType: typeof Highcharts;
}

export interface GraphPremadeProps {
  optionsList: Highcharts.Options[];
}

/* contains the information needed to create a Graph component */
export interface GraphData {
  graphType: GraphType;
  graphTitle?: string;
  xAxisTitle?: string;
  seriesData: SeriesData[];
}

/* contains the information needed to create a highcharts series */
export interface SeriesData {
  /*
   * specific graph type for each series (e.g. 'bar')
   */
  seriesType: GraphCombinedTypes;
  /*
   * ValueColumn is a subset of Column, may only contain numbers
   */
  data: [Column, ValueColumn];
  /*
   * columns with the same stack Id will be stacked
   */
  stackId?: string;
  /*
   * Y Axis Title
   */
  yAxisTitle?: string;
  /*
   * if true, a separate Y Axis will be created on the opposite side
   */
  isMultiAxis?: boolean;
}

/* Value Columns may only contain numbers as they are used for the Y-Axis  */
export interface ValueColumn {
  name: string;
  valueType: 'number';
  values: number[];
}

/*
 * These are the supported generic graph types.
 * Enums are used for runtime type checking
 */
export enum graphTypesEnum {
  basic = 'basic',
  threeD = '3D',
  combined = 'combined',
  synchronized = 'synchronized'
}

export type GraphType = 'basic' | '3D' | 'combined' | 'synchronized';

/*
 * The following declarations are needed to create the synchronized
 * graphs.
 * - see https://www.highcharts.com/docs/advanced-chart-features/highcharts-typescript-beta#extending-highcharts-in-typescript
 *   for more information on extending Highcharts
 */

declare module 'highcharts' {
  interface Point {
    highlight(event: Highcharts.PointerEventObject): void;
  }
}

declare module 'highcharts' {
  interface Series {
    searchPoint(event: Highcharts.PointerEventObject, isBoolean: true): Point;
  }
}
