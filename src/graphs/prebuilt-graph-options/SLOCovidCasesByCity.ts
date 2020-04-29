const categories = [
  'Paso Robles',
  'Atascadero',
  'Arroyo Grande',
  'Nipomo',
  'San Luis Obispo (City)',
  'Templeton',
  'San Miguel',
  'Pismo Beach',
  'Morro Bay',
  'Other'
];

const data = [[54, 28, 19, 14, 14, 7, 7, 7, 6, 13]];

export const CovidCasesBycityOptions: Highcharts.Options = {
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
    text: ' Covid-19 cases by City or Town in San Luis Obispo County'
  },
  xAxis: {
    type: 'category',
    categories: categories
  },
  yAxis: {
    title: {
      text: 'Ciy or town'
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
      name: 'City or town',
      type: 'bar',
      data: data[0]
    }
  ]
};
