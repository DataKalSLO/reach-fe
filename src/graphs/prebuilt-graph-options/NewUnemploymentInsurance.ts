const categories = [
  'Jan. 4',
  'Jan.18',
  'Jan.22',
  'Jan. 25',
  'Feb 1',
  'Feb 8',
  'Feb 15',
  'Feb 22',
  'Feb 29',
  'March 7',
  'March 14',
  'March 21',
  'March 28',
  'April 4',
  'April 11'
];

const data = [
  [109, 183, 167, 161, 120, 109, 125, 93, 103, 111, 142, 893, 8959, 6131, 3737]
];

export const unemploymentInsuranceClaimOptions: Highcharts.Options = {
  tooltip: {
    valueDecimals: 2,
    valuePrefix: '',
    valueSuffix: ' '
  },
  chart: {
    height: '70%',
    zoomType: 'xy',
    panning: { enabled: true },
    panKey: 'shift'
  },
  title: {
    text:
      'Number of Weekly New Unemployment Insurance (UI) Claims for San Luis Obispo County During Covid-19',
    widthAdjust: -200
  },
  xAxis: {
    type: 'category',
    categories: categories
  },
  yAxis: {
    title: {
      text: 'Number of Weekly New UI Claims'
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
      name: 'Unployment Insurance Claims',
      type: 'column',
      data: data[0]
    }
  ]
};
