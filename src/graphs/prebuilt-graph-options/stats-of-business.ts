const data = [
  [
    ['Agriculture, Forestry, Fishing and Hunting', 29],
    ['Mining, Quarrying, and Oil and Gas Extraction', 11],
    ['Utilities', 17],
    ['Construction', 828],
    ['Manufacturing', 392],
    ['Wholesale Trade', 275],
    ['Retail Trade', 1094],
    ['Transportation and Warehousing', 109],
    ['Information', 111],
    ['Finance and Insurance', 395],
    ['Real Estate and Rental and Leasing', 403],
    ['Professional, Scientific, and Technical Services', 777],
    ['Management of Companies and Enterprises', 28],
    [
      'Administrative and Support and Waste Management and Remediation Services',
      358
    ],
    ['Educational Services', 73],
    ['Health Care and Social Assistance', 945],
    ['Arts, Entertainment, and Recreation', 115],
    ['Accommodation and Food Services', 822],
    ['Other Services (except Public Administration)', 542],
    ['Industries not classified', 25]
  ],
  [
    ['Agriculture, Forestry, Fishing and Hunting', 56],
    ['Mining, Quarrying, and Oil and Gas Extraction', 37],
    ['Utilities', 12],
    ['Construction', 947],
    ['Manufacturing', 447],
    ['Wholesale Trade', 399],
    ['Retail Trade', 1432],
    ['Transportation and Warehousing', 200],
    ['Information', 197],
    ['Finance and Insurance', 578],
    ['Real Estate and Rental and Leasing', 589],
    ['Professional, Scientific, and Technical Services', 1178],
    ['Management of Companies and Enterprises', 57],
    [
      'Administrative and Support and Waste Management and Remediation Services',
      599
    ],
    ['Educational Services', 178],
    ['Health Care and Social Assistance', 1297],
    ['Arts, Entertainment, and Recreation', 197],
    ['Accommodation and Food Services', 1064],
    ['Other Services (except Public Administration)', 886],
    ['Industries not classified', 23]
  ],
  [
    ['San Luis Obispo', 7349],
    ['Santa Barbara', 10373]
  ]
];

export const statsOfBusinessOptions: Highcharts.Options = {
  tooltip: {
    valueDecimals: 0
  },
  xAxis: {
    title: { text: 'Industry' },
    type: 'category',
    categories: data[0].map(dat => dat[0] as string)
  },
  yAxis: {
    title: {
      text: 'Number of establishments'
    }
  },
  chart: {
    zoomType: 'x',
    panning: { enabled: true },
    panKey: 'shift'
  },
  title: {
    text: 'Number of Establishments by Industry (2016)'
  },
  plotOptions: {
    column: {
      allowPointSelect: true
    },
    pie: {
      allowPointSelect: true
    }
  },
  series: [
    {
      type: 'column',
      name: 'San Luis Obispo',
      data: data[0],
      stack: 'SLO'
    },
    {
      type: 'column',
      name: 'Santa Barbara',
      data: data[1],
      stack: 'SLO'
    },
    {
      type: 'pie',
      name: 'Total consumption',
      data: [
        {
          name: 'San Luis Obispo',
          y: 7349
        },
        {
          name: 'Santa Barbara',
          y: 10373
        }
      ],
      center: [220, 60],
      size: 100,
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }
  ]
};
