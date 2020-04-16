const categories = [
  'Cal Poly (SLO)',
  'Cuesta College',
  'Laurus College',
  'Fielding Graduate University',
  'Allan Hancock College',
  'Santa Barbara City College'
];

const data = [[4996, 1303, 177, 379, 1879, 3506]];

export const collegeGraduatesOptions: Highcharts.Options = {
  tooltip: {
    valueDecimals: 2
  },
  chart: {
    height: '80%',
    zoomType: 'xy',
    panning: {
      enabled: true
    },
    panKey: 'shift'
  },
  title: {
    text: 'Number of Graduates by College'
  },
  xAxis: {
    title: { text: 'College' },
    type: 'datetime',
    categories: categories
  },
  yAxis: {
    title: {
      text: 'Number of Graduates'
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
      name: 'College Graduates',
      type: 'column',
      data: data[0]
    }
  ]
};
