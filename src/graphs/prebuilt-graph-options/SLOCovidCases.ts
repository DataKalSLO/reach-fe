const categories = [
  '3/14',
  '3/15',
  '3/16',
  '3/17',
  '3/18',
  '3/19',
  '3/20',
  '3/21',
  '3/22',
  '3/23',
  '3/24',
  '3/25',
  '3/26',
  '3/27',
  '3/28',
  '3/29',
  '3/30',
  '3/31',
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
  '4/27'
];

const data = [
  [
    1,
    1,
    5,
    1,
    0,
    7,
    5,
    1,
    6,
    6,
    9,
    4,
    8,
    5,
    8,
    4,
    6,
    3,
    3,
    6,
    4,
    0,
    2,
    0,
    4,
    3,
    2,
    3,
    3,
    4,
    3,
    3,
    4,
    1,
    2,
    4,
    1,
    0,
    2,
    8,
    7,
    14,
    2,
    1,
    3
  ],
  [
    1,
    2,
    7,
    8,
    8,
    15,
    20,
    21,
    27,
    33,
    42,
    46,
    54,
    59,
    67,
    71,
    77,
    80,
    83,
    89,
    93,
    93,
    95,
    95,
    99,
    102,
    104,
    107,
    110,
    114,
    117,
    120,
    124,
    125,
    127,
    131,
    132,
    132,
    134,
    142,
    149,
    163,
    165,
    166,
    169
  ]
];

export const CovidCasesOptions: Highcharts.Options = {
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
    text: 'Covid-19 New vs. Total Confirmed Cases in San Luis Obispo',
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
      name: 'New confirmed Cases',
      type: 'column',
      data: data[0]
    },
    {
      name: 'Total confirmed cases',
      type: 'line',
      data: data[1]
    }
  ]
};