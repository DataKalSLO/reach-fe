import { seriesTypesEnum } from '../builder/types';

/*
 * Form Labels
 */
export const X_AXIS_LABEL = 'X-Axis';
export const Y_AXIS_LABEL = 'Y-Axis';
export const FORM_CANCEL_LABEL = 'Cancel';
export const FORM_RESET_LABEL = 'Reset';
export const FORM_UPDATE_LABEL = 'Update';

/*
 * Graph Data Sources Form
 */
export const DATASET_LABEL = 'Dataset';
export const SERIES_LABEL = 'Series';
export const ADD_SERIES_LABEL = 'Add Series';
export const INPUT_SERIES_LABEL = 'Series';
export const INPUT_NAME_LABEL = 'Name';
export const INPUT_COLUMN_LABEL = 'Column';

/*
 * Graph Formatting Form
 */
export const GRAPH_LABEL = 'Chart';

export const INPUT_TITLE_LABEL = 'Title';
export const INPUT_SUBTITLE_LABEL = 'Subtitle';
export const INPUT_PREFIX_LABEL = 'Prefix';
export const INPUT_SUFFIX_LABEL = 'Suffix';
export const INPUT_TYPE_LABEL = 'Type';
export const INPUT_DATA_LABELS_LABEL = 'Data Labels';
export const graphFormatLabels = [INPUT_TITLE_LABEL, INPUT_SUBTITLE_LABEL];
export const axisFormatLabels = [
  INPUT_TITLE_LABEL,
  INPUT_PREFIX_LABEL,
  INPUT_SUBTITLE_LABEL
];

/*
 * Form Data
 */
export const supportedSeriesTypes = [
  seriesTypesEnum.line,
  seriesTypesEnum.spline,
  seriesTypesEnum.area,
  seriesTypesEnum.areaspline,
  seriesTypesEnum.column
];
