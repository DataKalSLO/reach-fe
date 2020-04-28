const categories = [
    '3/23','3/24','3/25','3/26','3/27','3/28','3/29','3/30','3/31',
    '4/1','4/2','4/3','4/4','4/5','4/6','4/7','4/8','4/9','4/10','4/11','4/12','4/13','4/14','4/15','4/16','4/17','4/18','4/19','4/20',
    '4/21', '4/22', '4/23', '4/24', '4/25', '4/26', '4/27'
  ];
  
  const data = [
    [3,6,7,10,11,13,24,27,30,37,48,57,65,65,65,71,73,75,83,87,95,95,101,104,104,107,110,111,111,115,118,119,119,119,126,126],
    [28,34,36,39,41,45,38,43,40,36,33,30,22,25,25,24,25,25,20,20,16,19,15,16,16,16,17,18,18,17,22,28,40,42,36,38],
    [0,0,1,3,6,7,8,6,8,8,5,2,2,1,1,0,0,1,1,0,0,0,1,1,2,1,1,2,1,0,0,0,2,2,2,4],
    [1,1,1,1,1,2,1,1,2,2,3,4,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,0,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];
  
  export const CovidCasesByStatusOptions: Highcharts.Options = {
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
      text: 'SLO Cases By Status'
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
        name: 'Recovered',
        type: 'column',
        data: data[0]
      },
      {
        name: 'Home',
        type: 'column',
        data: data[1]
      },
      {
        name: 'Hospital (Non-ICU)',
        type: 'column',
        data: data[2]
      },
      {
        name: 'ICU',
        type: 'column',
        data: data[3]
      },
      {
        name: 'Death',
        type: 'column',
        data: data[4]
      }
    ]
  };
  