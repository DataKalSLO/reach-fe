export const categories = [
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017'
];

export const data = [
  [25.35, 18.52, 18.01, 19.71, 18.75, 20.31, 19.92, 27.57, 28.26]
];

export const wagesOptions: Highcharts.Options = {
  tooltip: {
    valuePrefix: '$',
    valueSuffix: ' USD',
    valueDecimals: 2
  },
  chart: {
    zoomType: 'xy',
    panning: {
      enabled: true
    },
    panKey: 'shift'
  },
  title: {
    text: 'Mean Real Wages Adjusted By Year'
  },
  xAxis: {
    type: 'datetime',
    categories: categories
  },
  yAxis: {
    title: {
      text: 'Mean Real Wages Adjusted'
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
      name: 'Mean Real Wages Adjusted',
      type: 'spline',
      data: data[0]
    }
  ]
};
