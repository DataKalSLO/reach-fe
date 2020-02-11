import React, { useState } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';


const options : Highcharts.Options = {
   
    title: {
      text: 'My chart'
    },
    series: [
      {
        type: 'spline',
        data: [1, 2, 1, 4, 3, 6]
      }
    ]
  };


function VizBuilder() {
    return (
    <div>
        <div>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}/>
        </div>
    </div>
    )
}

export default VizBuilder;