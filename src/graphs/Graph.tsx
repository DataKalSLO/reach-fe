import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
};

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
      name: 'Jane',
      data: [3, 2, 1, 3, 4] },  {
      type: 'column',
      name: 'John',
      data: [2, 3, 5, 7, 6] },  {
      type: 'column',
      name: 'Joe',
      data: [4, 3, 3, 9, 0] },  {
      type: 'spline',
      name: 'Average',
      data: [3, 2.67, 3, 6.33, 3.33]
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
  return (
    <div style={{ paddingBottom: '40px', paddingTop: '40px' }}>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options2} />
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options3} />
      </div>
    </div>
  );
}

export default Graph;
