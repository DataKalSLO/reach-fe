const categories = ['North County', 'South County', 'Coastal', 'Central'];

const data = [[137, 47, 12, 30]];

export const CovidCasesByRegionOptions: Highcharts.Options = {
  tooltip: {
    valueDecimals: 2,
    valuePrefix: '',
    valueSuffix: ' '
  },
  chart: {
    zoomType: 'xy',
    panning: { enabled: true },
    panKey: 'shift'
  },
  title: {
    text: ' Covid-19 Cases by Region in San Luis Obispo County'
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
      text: 'Region'
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
      name: 'Region',
      type: 'column',
      data: data[0]
    }
  ]
};
