const categories = [
  'ARROYO GRANDE CARE CENTER - SKILLED NURSING FACILITY',
  'ATASCADERO HOUSE - INTERMEDIATE CARE FACILITY-DD/H/N/CN/IID',
  'BAYSIDE CARE CENTER - SKILLED NURSING FACILITY ',
  'BRIGHTON AVENUE HOME - INTERMEDIATE CARE FACILITY-DD/H/N/CN/IID',
  'CA MENS COLONY-CORRECTIONAL TREATMENT CENTER - CORRECTIONAL TREATMENT CENTER',
  'CASA DE VIDA - INTERMEDIATE CARE FACILITY-DD/H/N/CN/IID',
  'CHUPARROSA STREET HOME - INTERMEDIATE CARE FACILITY-DD/H/N/CN/IID',
  'DANISH CARE CENTER - SKILLED NURSING FACILITY',
  'DEPARTMENT OF STATE HOSPITALS - ATASCADERO - ACUTE PSYCHIATRIC HOSPITAL',
  'DEPARTMENT OF STATE HOSPITALS - ATASCADERO - INTERMEDIATE CARE FACILITY ',
  'FRENCH HOSPITAL MEDICAL CENTER - INTENSIVE CARE',
  'FRENCH HOSPITAL MEDICAL CENTER - PERINATAL',
  'FRENCH HOSPITAL MEDICAL CENTER - UNSPECIFIED GENERAL ACUTE CARE',
  'MAGNOLIA COMMUNITY HOME - INTERMEDIATE CARE FACILITY-DD/H/N/CN/IID ',
  'MARIAN REGIONAL MEDICAL CENTER, ARROYO GRANDE - INTENSIVE CARE',
  'MARIAN REGIONAL MEDICAL CENTER, ARROYO GRANDE - REHABILITATION',
  'MARIAN REGIONAL MEDICAL CENTER, ARROYO GRANDE - UNSPECIFIED GENERAL ACUTE CARE',
  'MISSION VIEW HEALTH CENTER - SKILLED NURSING FACILITY',
  'MORRO BAY HOUSE - INTERMEDIATE CARE FACILITY-DD/H/N/CN/IID',
  'PEREIRA DRIVE HOME - NTERMEDIATE CARE FACILITY-DD/H/N/CN/IID',
  'PIKE, THE - INTERMEDIATE CARE FACILITY-DD/H/N/CN/IID',
  'SAN LUIS OBISPO HOUSE - INTERMEDIATE CARE FACILITY-DD/H/N/CN/IID',
  'SAN LUIS POST ACUTE CENTER - SKILLED NURSING FACILITY ',
  'SAN LUIS TRANSITIONAL CARE - SKILLED NURSING FACILITY',
  'SIERRA VISTA REGIONAL MEDICAL CENTER - CORONARY CARE',
  'SIERRA VISTA REGIONAL MEDICAL CENTER - INTENSIVE CARE',
  'SIERRA VISTA REGIONAL MEDICAL CENTER - INTENSIVE CARE NEWBORN NURSERY',
  'SIERRA VISTA REGIONAL MEDICAL CENTER - PERINATAL',
  'SIERRA VISTA REGIONAL MEDICAL CENTER - PEDIATRIC',
  'SIERRA VISTA REGIONAL MEDICAL CENTER - UNSPECIFIED GENERAL ACUTE CARE',
  'SUNSET COMMUNITY HOME - INTERMEDIATE CARE FACILITY-DD/H/N/CN/IID',
  'TAYLOR COMMUNITY HOME - INTERMEDIATE CARE FACILITY-DD/H/N/CN/IID',
  'TENET HEALTH CENTRAL COAST TWIN CITIES COMMUNITY HOSPITAL - INTENSIVE CARE ',
  'TENET HEALTH CENTRAL COAST TWIN CITIES COMMUNITY HOSPITAL - PERINATAL',
  'TENET HEALTH CENTRAL COAST TWIN CITIES COMMUNITY HOSPITAL - UNSPECIFIED GENERAL ACUTE CARE	',
  'VINEYARD HILLS HEALTH CENTER - SKILLED NURSING FACILITY	'
];

const data = [
  [
    99,
    6,
    145,
    6,
    86,
    59,
    6,
    65,
    265,
    1010,
    11,
    9,
    78,
    6,
    8,
    20,
    39,
    162,
    6,
    6,
    6,
    6,
    162,
    23,
    6,
    11,
    22,
    14,
    6,
    103,
    6,
    6,
    18,
    10,
    94,
    99
  ]
];

export const HealthCareFacityBedOptions: Highcharts.Options = {
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
    text:
      'Licensed and Certified Healthcare Facility Bed Types and Counts in SLO County',
    widthAdjust: -100
  },
  subtitle: {
    text: 'as of April 6th, 2020'
  },
  xAxis: {
    type: 'category',
    categories: categories
  },
  yAxis: {
    title: {
      text: ' Bed Capacity'
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
      name: 'Bed capacity',
      type: 'column',
      data: data[0]
    }
  ]
};
