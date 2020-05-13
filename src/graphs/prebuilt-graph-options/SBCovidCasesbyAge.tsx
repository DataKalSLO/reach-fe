const categories = [
  '70+ years',
  '50-69 years',
  '30-49 years',
  '18-29 years',
  '0-17 years'
];

export const SBCovidCasesByAgeOptions: Highcharts.Options = {
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
    text: ' Covid-19 Cases by Age in Santa Barbara County'
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
          name: '70+ years',
          y: 72
        },
        {
          name: '50-69 years',
          y: 423
        },
        {
          name: '30-49 years',
          y: 632
        },
        {
          name: '18-29 years',
          y: 210
        },
        {
          name: '0-17 years',
          y: 25
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
