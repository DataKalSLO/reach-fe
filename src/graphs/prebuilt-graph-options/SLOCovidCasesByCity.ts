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
    zoomType: 'xy',
    panning: { enabled: true },
    panKey: 'shift'
  },
  title: {
    text: ' Covid-19 Cases by City or Town in San Luis Obispo County'
  },
  subtitle: {
    text: 'as of May 11th, 2020'
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
