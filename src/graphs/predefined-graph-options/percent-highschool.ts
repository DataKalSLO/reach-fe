export const highschoolOptions: Highcharts.Options = {
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
    text: 'Percent of Highschool Graduates Per Year (San Luis Obispo County)'
  },
  xAxis: {
    type: 'datetime',
    categories: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017']
  },
  yAxis: {
    title: {
      text: 'Percent of Highschool Gradautes'
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
      name: 'Highschool Gradutes',
      type: 'column',
      data: [88.2, 88.9, 89.5, 89.6, 89.6, 89.7, 90.1, 90.5]
    }
  ]
};
