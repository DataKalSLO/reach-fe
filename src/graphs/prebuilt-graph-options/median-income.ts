const categories = [
  '1989',
  '1993',
  '1995',
  '1997',
  '1998',
  '1999',
  '2000',
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
  '2013',
  '2014',
  '2015',
  '2016',
  '2017'
];

const data = [
  [
    27756,
    32646,
    35683,
    38597,
    40032,
    40407,
    42498,
    42026,
    43456,
    44310,
    46225,
    49313,
    50202,
    55942,
    60088,
    55638,
    53620,
    53877,
    58427,
    57743,
    61775,
    61761,
    69517,
    70634
  ]
];

export const medianIncomeOptions: Highcharts.Options = {
  tooltip: {
    valuePrefix: '$',
    valueSuffix: ' USD'
  },
  chart: {
    zoomType: 'xy',
    panning: {
      enabled: true
    },
    panKey: 'shift'
  },
  title: {
    text: 'Median Household Income (San Luis Obispo)'
  },
  xAxis: {
    type: 'datetime',
    categories: categories
  },
  yAxis: {
    title: {
      text: 'Median Household Income'
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
      name: 'April',
      type: 'spline',
      data: data[0]
    }
  ]
};
