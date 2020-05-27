/*
 * General Graph Options Constants
 */
export const DEFAULT_TITLE = 'Chart';
export const DEFAULT_SUBTITLE = '';
export const DEFAULT_STACK_TYPE = 'normal';
export const DEFAULT_SUBTITLE_WITH_SOURCE = 'Source: ';
export const GRAPH_HEIGHT = '100%';
export const GRAPH_MAX_WIDTH = 500;
export const GRAPH_ZOOM_TYPE = 'x';
export const GRAPH_PANNING_KEY = 'shift';
export const GRAPH_PANNING_ENABLED = true;
export const GRAPH_SERIES_ALLOW_POINT_SELECT = true;
export const GRAPH_X_AXIS_CROSSHAIR_ENABLED = true;
export const GRAPH_X_AXIS_UNIQUE_NAMES_ENABLED = false;
export const GRAPH_SERIES_DATA_LABELS_ENABLED = false;
export const GRAPH_UNDEFINED_CATEGORY_VALUE = 'N/A';
export const GRAPH_COLORS = [
  '#7cb5ec',
  '#434348',
  '#90ed7d',
  '#f7a35c',
  '#8085e9',
  '#f15c80',
  '#e4d354',
  '#2b908f',
  '#f45b5b',
  '#91e8e1'
];

/*
 * Axis Options Constants
 */
export const X_AXIS_CATEGORY_TYPE = 'category';
export const X_AXIS_DATETIME_TYPE = 'datetime';
export const X_AXIS_LINEAR_TYPE = 'linear';

/*
 * Tooltip Options Constants
 */
export const TOOLTIP_STACK_FOOTER_PREFIX = 'Stack: ';
export const TOOLTIP_STACK_FOOTER_VALUE = '({series.userOptions.stack})';
export const TOOLTIP_DEFAULT_HIGHCHARTS_POINT_FORMAT =
  '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>';

/*
 * Accessibility Options Constants
 */
export const ACCESSIBILITY_ANNOUNCE_NEW_DATA_ENABLED = true;

/*
 * Responsive Options Constants
 */
export const RESPONSIVE_LEGEND_LAYOUT = 'horizontal';
export const RESPONSIVE_LEGEND_ALIGNMENT = 'center';
export const RESPONSIVE_LEGEND_VERTICAL_ALIGNMENT = 'bottom';

/*
 * 3D Graph Options Constants
 */
export const GRAPH_3D_ENABLED = true;
export const GRAPH_3D_SKEWED_X_AXIS_LABELS_ENABLED = true;
export const GRAPH_3D_ALPHA = 15;
export const GRAPH_3D_BETA = 15;
export const GRAPH_3D_DEPTH = 50;
export const GRAPH_3D_VIEW_DISTANCE = 25;
export const GRAPH_3D_PLOT_DEPTH = 40;

/*
 * Combined Graph Options Constants
 * These are for the Pie Series inside a
 * combined graph.
 */
export const GRAPH_COMBINED_CENTER_X = 100;
export const GRAPH_COMBINED_CENTER_Y = 80;
export const GRAPH_COMBINED_SIZE = 100;

/*
 * Synchronized Graph Options Constants
 */
export const GRAPH_SYNC_ID = 'sync';
export const GRAPH_SYNC_MARGIN_LEFT = 40;
export const GRAPH_SYNC_SPACING_TOP = 10;
export const GRAPH_SYNC_SPACING_BOTTOM = 20;
export const GRAPH_SYNC_TOOLTIP_SHADOW_ENABLED = false;
export const GRAPH_SYNC_TOOLTIP_SPLIT_ENABLED = false;
export const GRAPH_SYNC_TOOLTIP_BORDER_WIDTH = 0;
export const GRAPH_SYNC_TOOLTIP_BORDER_RADIUS = 0;
export const GRAPH_SYNC_TOOLTIP_REFERENCE_POINT_X = 10;
export const GRAPH_SYNC_TOOLTIP_REFERENCE_POINT_Y = 35;
export const GRAPH_SYNC_TOOLTIP_BACKGROUND_COLOR = 'white';
export const GRAPH_SYNC_TOOLTIP_HEADER_FORMAT = '{point.key} ';
export const GRAPH_SYNC_TRIGGER = 'syncExtremes';
export const GRAPH_SYNC_TOOLTIP_POINT_FORMAT =
  ' | <span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>';
