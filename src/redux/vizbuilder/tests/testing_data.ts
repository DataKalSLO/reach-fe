import { Metadata, PayloadDataset, Dataset } from '../types';

export const sampleMetadataPayload: Metadata[] = [
  {
    tableName: 'federal_contracts_fy2019',
    columnNames: [
      'id',
      'total_dollars_obligated',
      'current_total_value_of_award',
      'potential_total_value_of_award',
      'action_date',
      'period_of_performance_start_date',
      'period_of_performance_current_end_date',
      'period_of_performance_potential_end_date',
      'awarding_agency_name',
      'funding_agency_name',
      'recipient_name',
      'recipient_parent_name',
      'recipient_country_name',
      'recipient_address_line_1',
      'recipient_city_name',
      'recipient_state_name',
      'recipient_zip_4_code',
      'primary_place_of_performance_country_code',
      'primary_place_of_performance_country_name',
      'primary_place_of_performance_city_name',
      'primary_place_of_performance_county_name',
      'primary_place_of_performance_state_code',
      'primary_place_of_performance_state_name',
      'primary_place_of_performance_zip_4',
      'award_type',
      'award_description'
    ],
    dataTypes: [
      'int',
      'double',
      'double',
      'double',
      'datetime',
      'datetime',
      'datetime',
      'datetime',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string',
      'string'
    ]
  }
];

export const sampleDatasetPayload: PayloadDataset = {
  data: [
    [
      1,
      41453.64,
      41453.64,
      41453.64,
      '2018-10-01T00:00:00',
      '2018-10-01T00:00:00',
      '2018-12-31T00:00:00',
      '2018-12-31T00:00:00',
      'DEPARTMENT OF JUSTICE (DOJ)',
      'DEPARTMENT OF JUSTICE (DOJ)',
      'FEDERAL PRISON INDUSTRIES INC',
      'GOVERNMENT OF THE UNITED STATES',
      'UNITED STATES',
      '3301 LEESTOWN RD',
      'LEXINGTON',
      'KENTUCKY',
      '40511',
      'USA',
      'UNITED STATES',
      'LOMPOC',
      'SANTA BARBARA',
      'CA',
      'CALIFORNIA',
      '934360402',
      'BPA CALL',
      'FY19 1ST QUARTER MILK IN ACCORDANCE WITH BPA# DJBP0700NASBPA123.'
    ],
    [
      2,
      52200,
      52200,
      79200,
      '2018-10-01T00:00:00',
      '2018-10-01T00:00:00',
      '2019-09-30T00:00:00',
      '2021-03-31T00:00:00',
      'DEPARTMENT OF VETERANS AFFAIRS (VA)',
      'DEPARTMENT OF VETERANS AFFAIRS (VA)',
      'MARFRAN CLEANING LLC',
      'MARFRAN CLEANING  LLC',
      'UNITED STATES',
      '15502 OLD GALVESTON RD STE 718',
      'HOUSTON',
      'TEXAS',
      '77062',
      'USA',
      'UNITED STATES',
      'SAN LUIS OBISPO',
      'SAN LUIS OBISPO',
      'CA',
      'CALIFORNIA',
      '934015813',
      'DEFINITIVE CONTRACT',
      'IGF::OT::IGF JANITORIAL SERVICES'
    ]
  ]
};

export const sampleDatasetFormatted: Dataset = {
  name: 'federal_contracts_fy2019',
  columns: [
    {
      name: 'id',
      values: [1, 2]
    },
    {
      name: 'total_dollars_obligated',
      values: [41453.64, 52200]
    },
    {
      name: 'current_total_value_of_award',
      values: [41453.64, 52200]
    },
    {
      name: 'potential_total_value_of_award',
      values: [41453.64, 79200]
    },
    {
      name: 'action_date',
      values: ['2018-10-01T00:00:00', '2018-10-01T00:00:00']
    },
    {
      name: 'period_of_performance_start_date',
      values: ['2018-10-01T00:00:00', '2018-10-01T00:00:00']
    },
    {
      name: 'period_of_performance_current_end_date',
      values: ['2018-12-31T00:00:00', '2019-09-30T00:00:00']
    },
    {
      name: 'period_of_performance_potential_end_date',
      values: ['2018-12-31T00:00:00', '2021-03-31T00:00:00']
    },
    {
      name: 'awarding_agency_name',
      values: [
        'DEPARTMENT OF JUSTICE (DOJ)',
        'DEPARTMENT OF VETERANS AFFAIRS (VA)'
      ]
    },
    {
      name: 'funding_agency_name',
      values: [
        'DEPARTMENT OF JUSTICE (DOJ)',
        'DEPARTMENT OF VETERANS AFFAIRS (VA)'
      ]
    },
    {
      name: 'recipient_name',
      values: ['FEDERAL PRISON INDUSTRIES INC', 'MARFRAN CLEANING LLC']
    },
    {
      name: 'recipient_parent_name',
      values: ['GOVERNMENT OF THE UNITED STATES', 'MARFRAN CLEANING  LLC']
    },
    {
      name: 'recipient_country_name',
      values: ['UNITED STATES', 'UNITED STATES']
    },
    {
      name: 'recipient_address_line_1',
      values: ['3301 LEESTOWN RD', '15502 OLD GALVESTON RD STE 718']
    },
    {
      name: 'recipient_city_name',
      values: ['LEXINGTON', 'HOUSTON']
    },
    {
      name: 'recipient_state_name',
      values: ['KENTUCKY', 'TEXAS']
    },
    {
      name: 'recipient_zip_4_code',
      values: ['40511', '77062']
    },
    {
      name: 'primary_place_of_performance_country_code',
      values: ['USA', 'USA']
    },
    {
      name: 'primary_place_of_performance_country_name',
      values: ['UNITED STATES', 'UNITED STATES']
    },
    {
      name: 'primary_place_of_performance_city_name',
      values: ['LOMPOC', 'SAN LUIS OBISPO']
    },
    {
      name: 'primary_place_of_performance_county_name',
      values: ['SANTA BARBARA', 'SAN LUIS OBISPO']
    },
    {
      name: 'primary_place_of_performance_state_code',
      values: ['CA', 'CA']
    },
    {
      name: 'primary_place_of_performance_state_name',
      values: ['CALIFORNIA', 'CALIFORNIA']
    },
    {
      name: 'primary_place_of_performance_zip_4',
      values: ['934360402', '934015813']
    },
    {
      name: 'award_type',
      values: ['BPA CALL', 'DEFINITIVE CONTRACT']
    },
    {
      name: 'award_description',
      values: [
        'FY19 1ST QUARTER MILK IN ACCORDANCE WITH BPA# DJBP0700NASBPA123.',
        'IGF::OT::IGF JANITORIAL SERVICES'
      ]
    }
  ]
};

export const sampleConvertedTypes: string[] = [
  'number',
  'number',
  'number',
  'number',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'string'
];
