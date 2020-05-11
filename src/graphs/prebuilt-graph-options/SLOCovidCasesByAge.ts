const categories = ['65+ years', '50-64 years', '18-49 years', '0-17 years'];

export const CovidCasesByAgeOptions: Highcharts.Options = {
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
    text: ' Covid-19 Cases by Age in San Luis Obispo County'
  },
  xAxis: {
    type: 'category',
    categories: categories
  },
  yAxis: {
    title: {
      text: 'Age Group'
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
    },
    pie: {
      allowPointSelect: true,
      dataLabels: {
        color: 'black'
      }
    }
  },
  series: [
    {
      name: 'Age',
      type: 'pie',
      data: [
        {
          name: '65+ years',
          y: 45
        },
        {
          name: '50-64 years',
          y: 60
        },
        {
          name: '18-49 years',
          y: 95
        },
        {
          name: '0-17 years',
          y: 20
        }
      ],
      showInLegend: true,
      dataLabels: {
        enabled: true,
        useHTML: true
      }
    }
  ]
};
