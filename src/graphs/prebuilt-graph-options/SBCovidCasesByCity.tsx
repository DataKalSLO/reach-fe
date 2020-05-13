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

const data = [
  [23, 69, 10, 1, 15, 7, 91, 893, 183, 39, 25, 6],
  [0, 1, 2, 0, 1, 0, 2, 2, 2, 0, 1, 0]
];

export const SBCovidCasesBycityOptions: Highcharts.Options = {
  tooltip: {
    valueDecimals: 0,
    valuePrefix: '',
    valueSuffix: ' '
  },
  chart: {
    zoomType: 'xy',
    panning: { enabled: true },
    panKey: 'shift'
  },
  title: {
    text: ' Covid-19 Cases by City or Town in Santa Barbara County'
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
      text: 'Number of Cases'
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
    },
    {
      name: 'Number of Death by county',
      type: 'line',
      data: data[1]
    }
  ]
};
