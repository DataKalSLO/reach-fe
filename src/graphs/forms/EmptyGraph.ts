import { Graph } from '../../redux/graphbuilder/types';

export const emptyGraph: Graph = {
  graphMetaData: {
    graphId: '',
    userId: '',
    timestamp: 0,
    graphTitle: '',
    dataSources: [
      {
        datasetName: 'slo_airport',
        columnNames: ['month'],
        seriesType: 'X_AXIS'
      }
    ],
    snapshotUrl: '',
    graphOptions: {
      subtitle: '',
      seriesConfigs: [],
      xConfig: {
        title: '',
        valuePrefix: '',
        valueSuffix: ''
      },
      yConfig: {
        title: '',
        valuePrefix: '',
        valueSuffix: ''
      }
    }
  },
  graphData: {
    xAxisData: [],
    yAxisData: []
  },
  isEditing: false,
  is3D: false,
  isHidden: false
};
