import React from 'react';
import Highcharts from 'highcharts';
import drilldown from 'highcharts/modules/drilldown'
import HighchartsReact from 'highcharts-react-official';
import cylinder from 'highcharts/modules/cylinder';
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(Highcharts);
drilldown(Highcharts);

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

  const options2: Highcharts.Options = {
    chart: {
        type: 'cylinder',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25
        }
    },
    title: {
        text: 'Highcharts Cylinder Chart'
    },
    // plotOptions: {
    //     series: {
    //         depth: 25,
    //         colorByPoint: true
    //     }
    // },
    series: [{
        type:'cylinder',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        name: 'Cylinders',
        showInLegend: false
    }]
  };

  const options: Highcharts.Options = {

   title:{
       text:'drilldown',
   },
   xAxis:{
       type:'category',
   },
  
    series: [{
            type:'column',
            name: 'Dod Contract',
            colorByPoint: true,
            data:[{
                name: 'SLO County',
                y: 5,
                drilldown: 'slo'
            }, {
                name: 'SB County',
                y: 2,
                drilldown: 'sb'
            }, {
                name: 'Montery County',
                y: 4,
                drilldown: 'mc'
            }]
        }],
        drilldown: {
            series: [
            {
                type: 'column',
                id: 'zip',
                data: [
                    [' 93401', 7],
                    ['93402', 6],
                    ['93403', 1],
                    ['93404', 2],
                    ['93405', 3]
                ]
            },
            {
                name: 'cities',
                type: 'column',
                id: 'slo',
                data: [{
                    drilldown: 'zip'
                },
                    ['Santa Maria', 7],
                    ['San Luis Obispo', 6],
                    ['Atascadero', 1],
                    ['Arroyo Grande', 2],
                    ['Paso Robles', 3]
                ]
            }, {
                type: 'column',
                id: 'sb',
                data: [
                    ['Santa Barbara', 4],
                    ['Ventura', 2]
                ]
            }, {
                type: 'column',
                id: 'mc',
                data: [
                    ['Salinas', 4],
                    ['Gonzales', 2],
                    ['King City', 2]
                ]
            }]
        }
  };

function Graph3D(){
    return (
        <div>
            <div>
            <HighchartsReact highcharts={Highcharts} options={options}/>
            </div>
        </div>
    );
}

export default Graph3D;