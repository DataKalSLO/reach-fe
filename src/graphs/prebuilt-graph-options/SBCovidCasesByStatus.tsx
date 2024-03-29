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
  '4/30',
  '5/1',
  '5/2',
  '5/3',
  '5/4',
  '5/5',
  '5/6',
  '5/7',
  '5/8',
  '5/9',
  '5/10',
  '5/11'
];

const data = [
  [
    23,
    26,
    27,
    28,
    31,
    34,
    41,
    42,
    40,
    42,
    40,
    42,
    42,
    42,
    37,
    37,
    36,
    31,
    29,
    30,
    26,
    25,
    24,
    21,
    23,
    24,
    26,
    27,
    28,
    26,
    28,
    25,
    28,
    29,
    31,
    30,
    27,
    32,
    28,
    26
  ],
  [
    15,
    18,
    18,
    18,
    18,
    19,
    23,
    19,
    20,
    19,
    21,
    21,
    21,
    19,
    17,
    16,
    16,
    15,
    16,
    20,
    13,
    13,
    13,
    12,
    16,
    12,
    12,
    12,
    12,
    13,
    13,
    13,
    14,
    15,
    13,
    13,
    11,
    11,
    11,
    11
  ],
  [
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    4,
    4,
    4,
    5,
    5,
    5,
    6,
    7,
    7,
    7,
    7,
    8,
    8,
    8,
    8,
    8,
    9,
    10,
    11,
    11,
    11,
    11,
    11
  ]
];

export const SBCovidCasesByStatusOptions: Highcharts.Options = {
  tooltip: {
    valueDecimals: 2,
    valuePrefix: '',
    valueSuffix: ''
  },
  chart: {
    zoomType: 'xy',
    panning: { enabled: true },
    panKey: 'shift'
  },
  title: {
    text: 'Covid-19 Cases by Status in Santa Barbara County'
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
      text: 'Cases'
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
      name: 'Covid-19 Positive Patients',
      type: 'column',
      data: data[0]
    },
    {
      name: ' ICU Covid-19 Positive Patients',
      type: 'column',
      data: data[1]
    },
    {
      name: 'Death',
      type: 'column',
      data: data[2]
    }
  ]
};
