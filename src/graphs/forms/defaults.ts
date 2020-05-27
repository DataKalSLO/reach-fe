import { GRAPH_COLORS } from '../builder/constants';
import { SeriesConfiguration } from '../builder/types';

export function generateDefaultSeries(
  name: string,
  index: number
): SeriesConfiguration {
  return {
    seriesType: 'column',
    name: name,
    color: GRAPH_COLORS[index],
    dataLabels: false
  };
}
