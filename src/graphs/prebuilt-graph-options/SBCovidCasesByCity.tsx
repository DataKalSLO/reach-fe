const categories = [
    'SOUTH COUNTY UNINCORPORATED AREA includes communities of Montecito, Summerland and the City of Carpinteria',
    'CITY OF SANTA BARBARA and the unincorporated area of Mission Canyon',
    'CITY OF GOLETA',
    'COMMUNITY OF ISLA VISTA',
    'UNINCORPORATED AREA OF THE GOLETA VALLEY AND GAVIOTA',
    'SANTA YNEZ VALLEY',
    'CITY OF LOMPOC and the communities of Mission Hills and Vandenberg Village',
    'People incarcerated at the Federal Prison in Lompoc',
    'CITY OF SANTA MARIA',
    'COMMUNITY OF ORCUTT',
    'UNINCORPORATED AREAS of Sisquoc, Casmalia, Garey,  Cuyama, New Cuyama, and the City of Guadalupe',
    'others'
  ];
  
  const data = [[22, 59, 7, 1, 14, 5, 84, 106, 141, 37, 25, 5]];
  
  export const SBCovidCasesBycityOptions: Highcharts.Options = {
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
      text: ' Covid-19 Cases by City or Town in Santa Barbara County'
    },
    xAxis: {
      type: 'category',
      categories: categories
    },
    yAxis: {
      title: {
        text: 'Ciy or town'
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
        name: 'City or town',
        type: 'bar',
        data: data[0]
      }
    ]
  };
  