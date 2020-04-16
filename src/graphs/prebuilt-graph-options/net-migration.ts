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
  [9348.0, 7007.0, 5400.0, 4908.0, 5239.0, 4123.0, 6147.0, 5259.0, 5825.0]
];

export const NetMigrationOptions: Highcharts.Options = {
  chart: {
    height: '80%',
    zoomType: 'xy',
    panning: {
      enabled: true
    },
    panKey: 'shift'
  },
  title: {
    text: 'Net Migration Flow'
  },
  xAxis: {
    title: { text: 'Year' },
    categories: categories
  },
  yAxis: {
    title: {
      text: 'Values'
    }
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      allowPointSelect: true
    }
  },

  series: [
    {
      name: 'Net Migration',
      type: 'column',
      data: data[0]
    }
  ]
};
