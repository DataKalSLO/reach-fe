export const airportsOptions: Highcharts.Options = {
  tooltip: {
    valueDecimals: 2,
    valuePrefix: '$',
    valueSuffix: ' USD'
  },
  chart: {
    height: '100%',
    zoomType: 'xy',
    panning: { enabled: true },
    panKey: 'shift'
  },
  title: {
    text: 'Passenger Revenure Per Airport By Month (2019)'
  },
  xAxis: {
    type: 'category',
    categories: [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov'
    ]
  },
  yAxis: {
    title: {
      text: 'Total Passenger Revenue'
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
      name: 'United',
      type: 'column',
      data: [
        19481,
        19815,
        24304,
        24574,
        24813,
        26035,
        24868,
        25411,
        25185,
        29263,
        24976
      ],
      stack: 'Arroyo Grande'
    },
    {
      name: 'American',
      type: 'column',
      data: [
        12171,
        11686,
        15055,
        17541,
        18754,
        18539,
        19147,
        18191,
        17124,
        15261,
        16499
      ],
      stack: 'Atascadero'
    },
    {
      name: 'Alaska',
      type: 'column',
      data: [3664, 3421, 3723, 4178, 4167, 4285, 4423, 4286, 4159, 4171, 3955],
      stack: 'Grover Beach'
    }
  ]
};
