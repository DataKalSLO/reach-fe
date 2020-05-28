import {
  ASSETS,
  DEMOGRAPHICS,
  EDUCATION,
  HEALTH,
  HOUSING,
  INDUSTRY
} from '../../redux/graphs/constants';
import { seriesTypesEnum } from '../builder/types';

/*
 * Form Labels
 */
export const X_AXIS_LABEL = 'X-Axis';
export const Y_AXIS_LABEL = 'Y-Axis';
export const DATA_SOURCE_FORM_LABEL = 'Data Sources';
export const FORMATTING_FORM_LABEL = 'Formatting';

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
 * Graph Create Form
 */
export const INPUT_CATEGORY_LABEL = 'Category';
export const CATEGORY_CREATE_LABEL = 'Choose an Initiative';
export const X_AXIS_CREATE_LABEL = 'Choose the X-Axis Data Column';
export const Y_AXIS_CREATE_LABEL = 'Choose the Y-Axis Data Columns';
export const CATEGORY_STEP_LABEL = 'Choose an Initiative';
export const DATA_STEP_LABEL = 'Chart Data Sources';
export const FORMAT_STEP_LABEL = 'Chart Formatting';
export const FINISH_STEP_LABEL = "All steps completed - you're finished";

/*
 * Form Footer
 */
export const FORM_CANCEL_LABEL = 'Cancel';
export const FORM_RESET_LABEL = 'Reset';
export const FORM_UPDATE_LABEL = 'Update';
export const FORM_NEXT_LABEL = 'Next';
export const FORM_BACK_LABEL = 'Back';
export const FORM_FINISH_LABEL = 'Create Graph';
export const stepFooterLabels = [FORM_BACK_LABEL, FORM_NEXT_LABEL];
export const createFooterLabels = [FORM_BACK_LABEL, FORM_FINISH_LABEL];
export const createFormSteps = [
  DATA_STEP_LABEL,
  FORMAT_STEP_LABEL,
  CATEGORY_STEP_LABEL
];

/*
 * Form Data
 */
export const NONE = 'None';
export const DEFAULT_SERIES = seriesTypesEnum.column;
export const supportedSeriesTypes = [
  seriesTypesEnum.line,
  seriesTypesEnum.spline,
  seriesTypesEnum.area,
  seriesTypesEnum.areaspline,
  seriesTypesEnum.column
];
export const supportedInitiativeTypes = [
  NONE,
  INDUSTRY,
  DEMOGRAPHICS,
  ASSETS,
  EDUCATION,
  HOUSING,
  HEALTH
];
