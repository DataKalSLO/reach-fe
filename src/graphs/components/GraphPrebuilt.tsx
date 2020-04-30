import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import React, { useMemo, useRef, createRef, useEffect, LegacyRef, RefObject, useState } from 'react';
import GraphHeader from './GraphHeader';
import { StyledGraph, StyledGraphBox, StyledGraphCard } from './styles';
import { GraphPrebuiltProps, GraphRef } from './types';
import GraphEdit from './GraphEdit';
import Graph from './Graph';
import { isNull, isNullOrUndefined } from 'util';
import HighchartsReact from 'highcharts-react-official';
exporting(Highcharts);

/*
 * Renders an individual chart with the header.
 * This component contains two main parts:
 *  1. The header with a set of options (e.g. edit graph)
 *  2. The chart itself
 */

function GraphPrebuilt({ graph }: GraphPrebuiltProps) {
  const [state, setState] = useState<string>('');
  const highchartsRef = useRef<HighchartsReact>(null);

  useEffect(() => {
    console.log('object');
    if (!isNullOrUndefined(highchartsRef.current)) {
      console.log(highchartsRef.current?.chart.plotWidth);
      setState(highchartsRef.current?.chart.getSVG());
//    <img src="http://localhost:8000/offline-export.svg" alt="graph" />
    }
  }, []);

  return useMemo(() => {
    return (
      <StyledGraphBox>
        <StyledGraphCard>
          <GraphHeader graph={graph} />
          <StyledGraph>
            <Graph
              graphRecord={{ id: graph.id, options: graph.options }}
              ref={highchartsRef}
            />
            <GraphEdit graph={graph} />
          </StyledGraph>
        </StyledGraphCard>
      </StyledGraphBox>
    );
  }, [graph]);
}

export default GraphPrebuilt;
