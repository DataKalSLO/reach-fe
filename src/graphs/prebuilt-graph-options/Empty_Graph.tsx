const categories = [' ', ' '];

const data = [[], []];

export const EmptyOptions: Highcharts.Options = {
  tooltip: {
    valueDecimals: 2,
    valuePrefix: ' ',
    valueSuffix: ' '
  },
  chart: {
    zoomType: 'xy',
    panning: { enabled: true },
    panKey: 'shift'
  },
  title: {
    text: ''
  },
  xAxis: {
    type: 'category',
    categories: categories
  },
  yAxis: {
    title: {
      text: ''
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
      name: ' ',
      type: 'column',
      data: data[0]
    },
    {
      name: ' ',
      type: 'column',
      data: data[1]
    }
  ]
};
