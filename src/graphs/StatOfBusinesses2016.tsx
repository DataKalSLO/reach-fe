import React from 'react';
import Highcharts, { SeriesOptionsType } from 'highcharts';
import drilldown from 'highcharts/modules/drilldown';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from 'highcharts/highcharts-3d';
import { getDataInfo, processData } from './Utils/data_utils';
highcharts3d(Highcharts);
drilldown(Highcharts);

const dataset = 'statistics_of_businesses';

const dat: any = {
  dod_contracts: require('../common/assets/Local Data/dod_contracts_2018.json'),
  federal_contracts: require('../common/assets/Local Data/federal_contracts_2019.json'),
  statistics_of_businesses: require('../common/assets/Local Data/statistics_of_businesses_2016.json')
};

const dataInfo = getDataInfo(dat[dataset][2]);
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

const SBData : any= [];
const SLOData : any= [];
let PieDataSLO : any = 0;
let PieDataSB : any = 0;

const LineDataMap: any = {};

const drilldownPush: SeriesOptionsType[] = [];
const drilldown2 = Object.keys(processedData['2']).forEach((item: any) => {
    processedData['2'][item].forEach((item2: any) =>{
        const desc = item2['NAICS_descriptions'];
        LineDataMap[desc]=0;
    });

});
const drilldown1 = Object.keys(processedData['2']).forEach((item: any) => {
    processedData['2'][item].forEach((item2: any) =>{
    const  value = item2['number_of_establishments'];
    const desc = item2['NAICS_descriptions'];
    const employment = item2['employment']


    if (item === 'san_luis_obispo_county') {
        PieDataSLO += value;
    SLOData.push([desc,value])
    } else {

        PieDataSB += value;
        SBData.push([desc,value])
    }
    LineDataMap[desc] += employment;
});
});

const LineData : any = [];
Object.keys(LineDataMap).forEach(key => {
    LineData.push([key,LineDataMap[key]])
})

const options: Highcharts.Options = {
    tooltip: {
      useHTML: true,
      headerFormat: '<small>{point.key}</small><table>',
      valueDecimals: 2,
      valuePrefix: '$',
      valueSuffix: ' USD'
    },
  
    xAxis:{
        type: 'category'
    },
    yAxis: {
      title: {
        text: 'Award value',
        y: -10
      }
    },
  
    chart: {
      height: '900px'
    },
  
    title: {
      text: 'Department of Defense Contracts2'
    },

    plotOptions:
    {
        column:{
            stacking: 'normal',

        }
    },
  
    series: [
      {
        type: 'column',
        name: '',
        data: SLOData,
        stack: 'SLO'
      },
      {
        type: 'column',
        name: '',
        data: SBData,
        stack: 'SLO'
      },
      {
        type: 'pie',
        name: 'Total consumption',
        data: [
          {
            name: 'San Luis Obispo',
            y: PieDataSLO,
          },
          {
            name: 'Santa Barbara',
            y: PieDataSB,
          },
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


function StatOfBusiness2016() {
    console.log(processedData)
    console.log(dataInfo)
    console.log(LineData)
    console.log(LineDataMap)

  return (
    <div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}

export default StatOfBusiness2016;
