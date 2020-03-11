export const medianSaleOptions: Highcharts.Options = {
  tooltip: {
    valuePrefix: '$',
    valueSuffix: ' USD'
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
    text: 'Median Sale Price By Zip Code'
  },
  xAxis: {
    title: { text: 'zip code' },
    type: 'category',
    categories: [
      '93436',
      '93446',
      '93455',
      '93401',
      '93458',
      '93422',
      '93420',
      '93454',
      '93405',
      '93444',
      '93402',
      '93442',
      '93433'
    ]
  },
  yAxis: {
    title: {
      text: 'Median Sale Price'
    },
    labels: {
      format: '${value}'
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
      type: 'column',
      data: [
        363700,
        496500,
        448700,
        688700,
        379700,
        496900,
        683000,
        362000,
        716200,
        639000,
        571700,
        644100,
        487700
      ],
      stack: 'Month'
    },
    {
      name: 'May',
      type: 'column',
      data: [
        358200,
        501000,
        433400,
        705100,
        363100,
        479400,
        672200,
        354000,
        733000,
        616500,
        577900,
        659200,
        504900
      ],
      stack: 'Month'
    },
    {
      name: 'June',
      type: 'column',
      data: [
        361300,
        517400,
        437400,
        691500,
        374400,
        506800,
        706900,
        356300,
        740400,
        630500,
        577100,
        652700,
        477100
      ],
      stack: 'Month'
    },
    {
      name: 'July',
      type: 'column',
      data: [
        359100,
        498100,
        433400,
        687300,
        378900,
        530200,
        683000,
        365900,
        745400,
        602200,
        566900,
        682700,
        457400
      ],
      stack: 'Month'
    },
    {
      name: 'August',
      type: 'column',
      data: [
        376600,
        491600,
        431100,
        674600,
        394600,
        533100,
        664100,
        378300,
        721600,
        593000,
        589800,
        0,
        445500
      ],
      stack: 'Month'
    },
    {
      name: 'September',
      type: 'column',
      data: [
        370300,
        476800,
        419100,
        670800,
        382800,
        549800,
        669000,
        379400,
        725100,
        587400,
        565100,
        0,
        497800
      ],
      stack: 'Month'
    },
    {
      name: 'October',
      type: 'column',
      data: [
        0,
        499800,
        423100,
        649700,
        386900,
        532900,
        688600,
        376800,
        706100,
        646500,
        579600,
        0,
        509900
      ],
      stack: 'Month'
    }
  ]
};
