import { GraphData, SeriesData, ValueColumn } from '../components/types';
import { Column } from '../../redux/vizbuilder/types';

const categories = [
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017'
];
const data = [
  [
    14.303623522186397,
    14.155193236714975,
    14.08409382306358,
    14.381140861466822,
    14.789132448286509,
    15.156944444444445,
    14.832761264879865,
    14.87676866243814
  ]
];

export const incomeInequalityOptions: Highcharts.Options = {
  tooltip: {
    valueSuffix: '%',
    valueDecimals: 2
  },
  chart: {
    height: '100%',
    zoomType: 'xy',
    panning: {
      enabled: true
    },
    panKey: 'shift'
  },
  title: {
    text: 'Income Inequality'
  },
  xAxis: {
    type: 'datetime',
    categories: categories
  },
  yAxis: {
    title: {
      text: 'Inequality Percentage'
    },
    labels: {
      format: '{value}%'
    }
  },
  plotOptions: {
    series: {
      allowPointSelect: true,
      stacking: 'normal'
    },
    column: {
      allowPointSelect: true,
      stacking: 'normal'
    }
  },
  series: [
    {
      name: 'Income Inequality',
      type: 'column',
      data: data[0]
    }
  ]
};

const seriesData: SeriesData[] = [
  {
    seriesType: 'column',
    data: [
      {
        name: 'Income Inequality',
        valueType: 'string',
        values: categories
      } as Column,
      {
        name: 'Inequality Percentage',
        valueType: 'number',
        values: data[0]
      } as ValueColumn
    ]
  }
];

export const incomeInequalityGraphData: GraphData = {
  graphType: 'basic',
  graphTitle: incomeInequalityOptions.title?.text,
  seriesData: seriesData
};
