import React, { useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ShareSheet from './ShareSheet';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';

// require is necessary to attach exportChart() to buttons
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('highcharts/modules/exporting')(Highcharts);

type DodContract = {
  recipientName: string;
  totalAwardValue: number;
  awardType: string;
  location: string;
};

export const DATA = {
  dodContracts: require('../common/assets/Local Data/dod_contracts_2018.json')
};

const data = DATA.dodContracts.map((item: DodContract) => {
  return {
    name: item.recipientName,
    y: item.totalAwardValue
  };
});
const options: Highcharts.Options = {
  tooltip: {
    useHTML: true,
    headerFormat: '<small>{point.key}</small><table>',
    valueDecimals: 2,
    valuePrefix: '$',
    valueSuffix: ' USD'
  },

  yAxis: {
    title: {
      text: 'Award value',
      y: -10
    }
  },

  chart: {
    height: '80%'
  },

  title: {
    text: 'Department of Defense Contracts'
  },

  series: [
    {
      name: 'Companies',
      type: 'column',
      data: data
    }
  ],

  // Allows us to use custom components for exporting
  exporting: {
    enabled: false
  }
};

const StyledBox = styled(Box)({
  position: 'relative'
});

function Graph() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef: any = useRef<HighchartsReact | null>(null);
  const exportChart = () => chartRef.current.chart.exportChart();

  return (
    <StyledBox>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
      <ShareSheet exportChartHandler={exportChart} />
    </StyledBox>
  );
}

export default Graph;
