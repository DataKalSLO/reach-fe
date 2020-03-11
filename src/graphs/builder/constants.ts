/*
 * General Chart Options Constants
 */
export const EMPTY_TEXT = '';
export const DEFAULT_SUBTITLE = 'Source: ';
export const DEFAULT_STACKING_TYPE = 'normal';
export const DEFAULT_MAX_WIDTH = 500;
export const DEFAULT_ZOOM_TYPE = 'x';
export const RESPONSIVE_LEGEND_LAYOUT = 'horizontal';
export const RESPONSIVE_LEGEND_ALIGNMENT = 'center';
export const RESPONSIVE_LEGEND_VERTICAL_ALIGNMENT = 'bottom';
export const X_AXIS_CATEGORY_TYPE = 'category';
export const X_AXIS_TIMESERIES_TYPE = 'datetime';
export const SYNCH_GRAPH_ID = 'sync';
export const PANNING_KEY = 'shift';

/*
 * 3D Chart Options Constants
 */
export const DEFAULT_3D_ALPHA = 15;
export const DEFAULT_3D_BETA = 15;
export const DEFAULT_3D_DEPTH = 50;
export const DEFAULT_3D_VIEW_DISTANCE = 25;
export const DEFAULT_3D_PLOT_DEPTH = 40;

/*
 * Combined Chart Options Constants
 * These are for the Pie Series inside a
 * combined chart.
 */
export const COMBINED_CHART_CENTER_X = 100;
export const COMBINED_CHART_CENTER_Y = 80;
export const COMBINED_CHART_SIZE = 100;

/*
 * Synchorinzed Chart Options Constants
 */
export const SYNCH_MARGIN_LEFT = 40;
export const SYNCH_SPACING_TOP = 10;
export const SYNCH_SPACING_BOTTOM = 20;
export const SYNCH_TOOLTIP_BACKGROUND_COLOR = 'white';
export const SYNCH_TOOLTIP_BORDER_WIDTH = 0;
export const SYNCH_TOOLTIP_BORDER_RADIUS = 0;
export const SYNCH_TOOLTIP_HEADER_FORMAT = '{point.key} ';
export const SYNCH_TRIGGER = 'syncExtremes';
export const SYNCH_TOOLTIP_POINT_FORMAT =
  ' | <span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>';

/*
 * Chart Type Constants
 */
export const GRAPH_BASIC_LITERAL_TYPE = 'basic';
export const GRAPH_3D_LITERAL_TYPE = '3D';
export const GRAPH_COMBINED_LITERAL_TYPE = 'combined';
export const GRAPH_SYNCHRONIZED_LITERAL_TYPE = 'synchronized';
export const NUMBER_LITERAL_TYPE = 'number';

/*
 * Highcharts Constructor Type Options
 */
export const CHART_CONSTRUCTOR = 'chart';
export const STOCK_CONSTRUCTOR = 'StockChart';
