/*
 * General Graph Options Constants
 */
export const DEFAULT_TITLE = 'Chart';
export const DEFAULT_SUBTITLE = '';
export const GRAPH_HEIGHT = '100%';
export const GRAPH_MAX_WIDTH = 500;
export const GRAPH_ZOOM_TYPE = 'x';
export const GRAPH_PANNING_KEY = 'shift';

/*
 * Responsive Options Constants
 */
export const RESPONSIVE_LEGEND_LAYOUT = 'horizontal';
export const RESPONSIVE_LEGEND_ALIGNMENT = 'center';
export const RESPONSIVE_LEGEND_VERTICAL_ALIGNMENT = 'bottom';

/*
 * 3D Graph Options Constants
 */
export const GRAPH_3D_ALPHA = 15;
export const GRAPH_3D_BETA = 15;
export const GRAPH_3D_DEPTH = 50;
export const GRAPH_3D_VIEW_DISTANCE = 25;
export const GRAPH_3D_PLOT_DEPTH = 40;

/*
 * Synchronized Graph Options Constants
 */
export const GRAPH_SYNCH_TOOLTIP_BORDER_WIDTH = 0;
export const GRAPH_SYNCH_TOOLTIP_BORDER_RADIUS = 0;
export const GRAPH_SYNCH_TOOLTIP_REFERENCE_POINT_X = 10;
export const GRAPH_SYNCH_TOOLTIP_REFERENCE_POINT_Y = 35;
export const GRAPH_SYNCH_TOOLTIP_BACKGROUND_COLOR = 'white';
export const GRAPH_SYNCH_TOOLTIP_HEADER_FORMAT = '{point.key} ';
export const GRAPH_SYNCH_TRIGGER = 'syncExtremes';
export const GRAPH_SYNCH_TOOLTIP_POINT_FORMAT =
  ' | <span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>';
