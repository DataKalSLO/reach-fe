const noData = {
  type: 'HeatMap',
  name: 'no data',
  valueKey: 'NO_DATA',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[[0, 0]]]
      },
      properties: {
        NO_DATA: 0,
        'zip-code-tabulation-area': '*'
      }
    }
  ]
};

export default noData;
