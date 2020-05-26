export const categories = [
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013'
];

export const data = [
  [
    120.42,
    137.14,
    204.63,
    203.15,
    199.7,
    200.7,
    200.7,
    216.61,
    216.61,
    216.61,
    195.54,
    188.75,
    214.26
  ],
  [
    100.07,
    106.32,
    103.04,
    102.47,
    98.81,
    105.64,
    105.61,
    105.61,
    105.61,
    105.61,
    107.88,
    104.92,
    105.6
  ],
  [
    217.21,
    265.18,
    304.87,
    282.5,
    287.37,
    338.18,
    338.19,
    338.1,
    338.09,
    338.09,
    292.02,
    295.42,
    295.42
  ],
  [
    112.16,
    122.12,
    119.38,
    118.3,
    115.77,
    115.77,
    115.77,
    115.77,
    115.77,
    115.77,
    122.83,
    100.15,
    114.77
  ],
  [
    209.99,
    233.97,
    223.06,
    246.09,
    257.19,
    207.05,
    207.05,
    207.05,
    207.05,
    207.05,
    201.8,
    229.78,
    230.64
  ],
  [
    60.88,
    66.66,
    67.54,
    66.56,
    64.22,
    64.25,
    64.25,
    64.25,
    64.21,
    64.21,
    76.49,
    65.25,
    65.26
  ],
  [
    418.67,
    492.78,
    460.7,
    454.93,
    443.81,
    433.36,
    433.36,
    425.68,
    443.92,
    521.6,
    494.91,
    410.0,
    530.27
  ]
];

export const milesTraveledOptions: Highcharts.Options = {
  tooltip: {
    valueDecimals: 2,
    valueSuffix: 'K Miles'
  },
  chart: {
    zoomType: 'xy',
    panning: { enabled: true },
    panKey: 'shift'
  },
  title: {
    text: 'Daily Vehicle Miles Traveled by City'
  },
  xAxis: {
    type: 'category',
    categories: categories
  },
  yAxis: {
    title: {
      text: 'Daily Vehicle Miles'
    },
    labels: {
      format: '{value} K'
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
      name: 'Arroyo Grande',
      type: 'column',
      data: data[0],
      stack: 'City'
    },
    {
      name: 'Atascadero',
      type: 'column',
      data: data[1],
      stack: 'City'
    },
    {
      name: 'Grover Beach',
      type: 'column',
      data: data[2],
      stack: 'City'
    },

    {
      name: 'Morro Bay',
      type: 'column',
      data: data[3],
      stack: 'City'
    },

    {
      name: 'Paso Robles',
      type: 'column',
      data: data[4],
      stack: 'City'
    },

    {
      name: 'Pismo Beach',
      type: 'column',
      data: data[5],
      stack: 'City'
    },

    {
      name: 'San Luis Obispo',
      type: 'column',
      data: data[6],
      stack: 'City'
    }
  ]
};
