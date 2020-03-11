import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
exporting(Highcharts);

export function GraphIndustryStats() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options = require('../predefined-graphs/StateOfBusinesses2016.json');
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
