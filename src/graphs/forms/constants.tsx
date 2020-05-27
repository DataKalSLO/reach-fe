import { seriesTypesEnum } from '../builder/types';

/*
 * Form Labels
 */
export const FORM_CANCEL_LABEL = 'Cancel';
export const FORM_RESET_LABEL = 'Reset';
export const FORM_UPDATE_LABEL = 'Update';

/*
 * Graph Data Sources Form
 */
export const SERIES_LABEL = 'Series';
export const ADD_SERIES_LABEL = 'Add Series';
export const INPUT_SERIES_LABEL = 'Series';

/*
 * Graph Formatting Form
 */
export const INPUT_TITLE_LABEL = 'Title';
export const INPUT_TYPE_LABEL = 'Type';
export const INPUT_DATA_LABELS_LABEL = 'Data Labels';

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
