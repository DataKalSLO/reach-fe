const categories = [
  '4/1',
  '4/2',
  '4/3',
  '4/4',
  '4/5',
  '4/6',
  '4/7',
  '4/8',
  '4/9',
  '4/10',
  '4/11',
  '4/12',
  '4/13',
  '4/14',
  '4/15',
  '4/16',
  '4/17',
  '4/18',
  '4/19',
  '4/20',
  '4/21',
  '4/22',
  '4/23',
  '4/24',
  '4/25',
  '4/26',
  '4/27',
  '4/28',
  '4/29',
  '4/30'
];

const data = [
  [
    103,
    125,
    154,
    167,
    171,
    189,
    209,
    221,
    232,
    254,
    258,
    261,
    271,
    292,
    317,
    331,
    349,
    372,
    377,
    388,
    414,
    437,
    445,
    450,
    457,
    464,
    466,
    469,
    477,
    490
  ]
];

export const SBCovidCasesOptions: Highcharts.Options = {
  tooltip: {
    valueDecimals: 2,
    valuePrefix: '',
    valueSuffix: ''
  },
  chart: {
    height: '70%',
    zoomType: 'xy',
    panning: { enabled: true },
    panKey: 'shift'
  },
  title: {
    text: 'Covid-19 Total Confirmed Cases in Santa Barbara County',
    widthAdjust: -100
  },
  xAxis: {
    type: 'category',
    categories: categories
  },
  yAxis: {
    title: {
      text: 'New Cases'
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
      name: 'Total confirmed cases',
      type: 'line',
      data: data[0]
    }
  ]
};
