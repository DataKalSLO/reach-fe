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
  ]
  // Allows us to use custom components for exporting
  // exporting: {
  //   enabled: false
  // }
};

const StyledBox = styled(Box)({
  position: 'relative'
});

const options2: Highcharts.Options = {
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
    text: 'Department of Defense Contracts2'
  },

  series: [
    {
      type: 'column',
      name: 'Atascadero',
      data: [3, 2, 1, 3, 4]
    },
    {
      type: 'column',
      name: 'San Luis Obispo',
      data: [2, 3, 5, 7, 6]
    },
    {
      type: 'column',
      name: 'Santa Maria',
      data: [4, 3, 3, 9, 0]
    },
    {
      type: 'spline',
      name: 'Average',
      data: [3, 2.67, 3, 6.33, 3.33]
    },
    {
      type: 'pie',
      name: 'Total consumption',
      data: [
        {
          name: 'Atascadero',
          y: 13,
          color: 'LightBlue'
        },
        {
          name: 'Santa Maria',
          y: 23,
          color: 'LightGreen'
        },
        {
          name: 'San Luis Obispo',
          y: 19,
          color: 'black'
        }
      ],
      center: [100, 60],
      size: 100,
      showInLegend: false,
      dataLabels: {
        enabled: true
      }
    }
  ]
};

const options3: Highcharts.Options = {
  tooltip: {
    useHTML: true,
    headerFormat: '<small>{point.key}</small><table>',
    valueDecimals: 2,
    valuePrefix: '$',
    valueSuffix: ' USD'
  },

  chart: {
    height: '80%'
  },

  title: {
    text: 'Department of Defense Contracts3'
  },

  series: [
    {
      name: 'Companies',
      type: 'bar',
      data: data
    }
  ]
};

function Graph() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef: any = useRef<HighchartsReact | null>(null);
  const exportChart = () => chartRef.current.chart.exportChart();
  return (
    <div
      style={{
        paddingTop: '50px',
        paddingBottom: '40px',
        //border:" 4px solid green",
        scrollSnapType: 'y mandatory'
      }}
    >
      <div
        style={{
          paddingBottom: '40px',
          paddingTop: '100',
          scrollSnapAlign: 'center'
        }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={options2}
          ref={chartRef}
        />
        <ShareSheet exportChartHandler={exportChart} />
      </div>
      <div style={{ paddingBottom: '40px', scrollSnapAlign: 'center' }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartRef}
        />
      </div>
      <div style={{ paddingBottom: '40px', scrollSnapAlign: 'center' }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options3}
          ref={chartRef}
        />
      </div>
    </div>
  );
}

export default Graph;
