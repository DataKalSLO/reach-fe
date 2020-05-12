const categories = [
  'Paso Robles',
  'Atascadero',
  'Arroyo Grande',
  'San Luis Obispo (City)',
  'Nipomo',
  'CA Mens Colony (inmates)',
  'San Miguel',
  'Templeton',
  'Pismo Beach',
  'Morro Bay',
  'Other'
];

const data = [[86, 34, 19, 17, 17, 11, 9, 8, 7, 6, 12]];

export const CovidCasesBycityOptions: Highcharts.Options = {
  tooltip: {
    valueDecimals: 0,
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
    text: ' Covid-19 Cases by City or Town in San Luis Obispo County'
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
