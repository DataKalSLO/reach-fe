import React from 'react';
import Highcharts, { SeriesOptionsType } from 'highcharts';
import drilldown from 'highcharts/modules/drilldown';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from 'highcharts/highcharts-3d';
import { getDataInfo, processData } from './Utils/data_utils';
highcharts3d(Highcharts);
drilldown(Highcharts);

const dataset = 'dod_contracts';

const dat: any = {
  dod_contracts: require('../common/assets/Local Data/dod_contracts_2018.json'),
  federal_contracts: require('../common/assets/Local Data/federal_contracts_2019.json'),
  statistics_of_businesses: require('../common/assets/Local Data/statistics_of_businesses_2016.json')
};

const dataInfo = getDataInfo(dat[dataset][0]);
const processedData = processData(
  dat[dataset],
  dataInfo.locationColumn,
  dataInfo.regionLevel,
  dataInfo.yColumns
);

const data = processedData['1']['full_region'].map((item: any) => {
  return {
    type: 'column',
    name: item.name,
    y: item.totalAwardValue,
    drilldown: item.name
  };
});

const drilldownPush: SeriesOptionsType[] = [];

const drilldown1 = Object.keys(processedData['2']).forEach((item: any) => {
  const drilldownObject: any = [];
  const id = ' ';
  processedData['2'][item].forEach((item2: any) => {
    drilldownObject.push({
      name: item2.name,
      y: item2.totalAwardValue,
      drilldown: item2.name
    });
  });
  drilldownPush.push({
    type: 'column',
    id: item,
    name:'Cities',
    data: drilldownObject
  });
});

const drilldown2 = Object.keys(processedData['3']).forEach((item: any) => {
  const drilldownObject: any = [];
  const id = ' ';
  processedData['3'][item].forEach((item2: any) => {
    drilldownObject.push([item2.recipientName, item2.totalAwardValue]);
  });
  drilldownPush.push({
    type: 'column',
    id: item,
    name: "Companies",
    data: drilldownObject
  });
});

const options: Highcharts.Options = {
  title: {
    text: 'Department of Defense Contract 2018'
  },
  xAxis: {
    type: 'category'
  },
  chart: {
    height: '100%'
  },
  series: [
    {
      type: 'column',
      name: 'Counties',
      colorByPoint: true,
      data: data
    }
  ],
  drilldown: {
    series: drilldownPush
  }
};

const fs =require('fs');
const myOptions = JSON.stringify(options);

function DrilldownDOD() {
    //console.log(myOptions);
  return (
    <div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}

export default DrilldownDOD;
