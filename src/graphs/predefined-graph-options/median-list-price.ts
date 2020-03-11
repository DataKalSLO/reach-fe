import { GraphData, SeriesData, ValueColumn } from '../components/types';
import { Column } from '../../redux/vizbuilder/types';

const data = [
  [
    379000.0,
    559000.0,
    466157.0,
    759950.0,
    400000.0,
    649000.0,
    750000.0,
    374950.0,
    799900.0,
    699000.0,
    635000.0,
    679000.0,
    544499.5,
    919500.0,
    790000.0,
    879000.0,
    488938.0,
    948000.0,
    514975.0
  ],
  [
    371000.0,
    554000.0,
    466157.0,
    772000.0,
    399900.0,
    637000.0,
    774950.0,
    372400.0,
    829000.0,
    698900.0,
    635000.0,
    679000.0,
    549000.0,
    899000.0,
    784500.0,
    884000.0,
    488876.0,
    949000.0,
    507275.0
  ],
  [
    375000.0,
    565000.0,
    469375.0,
    747450.0,
    404900.0,
    627500.0,
    763888.5,
    384500.0,
    836500.0,
    680745.0,
    630000.0,
    725000.0,
    559000.0,
    892000.0,
    699450.0,
    859000.0,
    482900.0,
    962500.0,
    514975.0
  ],
  [
    385000.0,
    569900.0,
    460000.0,
    751160.0,
    415900.0,
    604500.0,
    792450.0,
    399000.0,
    849995.0,
    699990.0,
    650000.0,
    729000.0,
    559000.0,
    889000.0,
    709950.0,
    871950.0,
    499000.0,
    1095000.0,
    519975.0
  ],
  [
    379000.0,
    568250.0,
    464945.0,
    749000.0,
    399700.0,
    591000.0,
    794950.0,
    397000.0,
    836500.0,
    746800.0,
    649000.0,
    727750.0,
    559450.0,
    899000.0,
    812499.5,
    861950.0,
    499000.0,
    1057500.0,
    499300.0
  ],
  [
    382600.0,
    549000.0,
    464500.0,
    756235.0,
    375000.0,
    585000.0,
    799250.0,
    385000.0,
    765000.0,
    754499.5,
    644000.0,
    709000.0,
    565900.0,
    899000.0,
    780500.0,
    845000.0,
    502500.0,
    1049500.0,
    566999.5
  ],
  [
    399000.0,
    547000.0,
    469990.0,
    719900.0,
    375000.0,
    569000.0,
    799990.0,
    384500.0,
    784000.0,
    759000.0,
    690000.0,
    692450.0,
    559500.0,
    889000.0,
    844500.0,
    789500.0,
    475000.0,
    1049500.0,
    589000.0
  ]
];

const categories = [
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
  '93433',
  '93449',
  '93465',
  '93428',
  '93445',
  '93430',
  '93426'
];

export const medianListOptions: Highcharts.Options = {
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
    text: 'Median List Price By Zip Code'
  },
  xAxis: {
    title: { text: 'Zip Code' },
    type: 'category',
    categories: categories
  },
  yAxis: {
    title: {
      text: 'Median List Price'
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
      data: data[0],
      stack: 'Month'
    },
    {
      name: 'May',
      type: 'column',
      data: data[1],
      stack: 'Month'
    },
    {
      name: 'June',
      type: 'column',
      data: data[2],
      stack: 'Month'
    },
    {
      name: 'July',
      type: 'column',
      data: data[3],
      stack: 'Month'
    },
    {
      name: 'August',
      type: 'column',
      data: data[4],
      stack: 'Month'
    },
    {
      name: 'September',
      type: 'column',
      data: data[5],
      stack: 'Month'
    },
    {
      name: 'October',
      type: 'column',
      data: data[6],
      stack: 'Month'
    }
  ]
};

const seriesData: SeriesData[] = [
  {
    seriesType: 'column',
    stackId: 'Month',
    data: [
      {
        name: 'April',
        valueType: 'string',
        values: categories
      } as Column,
      {
        name: 'Median List Price',
        valueType: 'number',
        values: data[0]
      } as ValueColumn
    ]
  },
  {
    seriesType: 'column',
    stackId: 'Month',
    data: [
      {
        name: 'May',
        valueType: 'string',
        values: categories
      } as Column,
      {
        name: 'Median List Price',
        valueType: 'number',
        values: data[1]
      } as ValueColumn
    ]
  },
  {
    seriesType: 'column',
    stackId: 'Month',
    data: [
      {
        name: 'June',
        valueType: 'string',
        values: categories
      } as Column,
      {
        name: 'Median List Price',
        valueType: 'number',
        values: data[2]
      } as ValueColumn
    ]
  },
  {
    seriesType: 'column',
    stackId: 'Month',
    data: [
      {
        name: 'July',
        valueType: 'string',
        values: categories
      } as Column,
      {
        name: 'Median List Price',
        valueType: 'number',
        values: data[3]
      } as ValueColumn
    ]
  },
  {
    seriesType: 'column',
    stackId: 'Month',
    data: [
      {
        name: 'August',
        valueType: 'string',
        values: categories
      } as Column,
      {
        name: 'Median List Price',
        valueType: 'number',
        values: data[4]
      } as ValueColumn
    ]
  },
  {
    seriesType: 'column',
    stackId: 'Month',
    data: [
      {
        name: 'September',
        valueType: 'string',
        values: categories
      } as Column,
      {
        name: 'Median List Price',
        valueType: 'number',
        values: data[5]
      } as ValueColumn
    ]
  },
  {
    seriesType: 'column',
    stackId: 'Month',
    data: [
      {
        name: 'October',
        valueType: 'string',
        values: categories
      } as Column,
      {
        name: 'Median List Price',
        valueType: 'number',
        values: data[6]
      } as ValueColumn
    ]
  }
];

export const medianListGraphData: GraphData = {
  graphType: 'basic',
  graphTitle: medianListOptions.title?.text,
  xAxisTitle: 'Zip Code',
  seriesData: seriesData
};
