// Action Constants
export const SHOW_SUCCESS_STATUS_MESSAGE = 'SHOW_SUCCESS_STATUS_MESSAGE';

// Snackbar Severity Constants
export const SUCCESS_SEVERITY = 'success';
export const INFO_SEVERITY = 'info';
export const WARNING_SEVERITY = 'warning';
export const ERROR_SEVERITY = 'error';

// Messages
enum DataType {
  GRAPH = 'Graph',
  STORY = 'Story'
}

const createSaveMessage = (dataType: DataType) =>
  `${dataType} saved successfully!`;
const createUpdateMessage = (dataType: DataType) =>
  `${dataType} updated successfully!`;
const createDeleteMessage = (dataType: DataType) =>
  `${dataType} updated successfully!`;

export const GRAPH_SAVE_MESSAGE = createSaveMessage(DataType.GRAPH);
export const GRAPH_UPDATE_MESSAGE = createUpdateMessage(DataType.GRAPH);
export const GRAPH_DELETE_MESSAGE = createDeleteMessage(DataType.GRAPH);

export const STORY_SAVE_MESSAGE = createSaveMessage(DataType.STORY);
export const STORY_UPDATE_MESSAGE = createUpdateMessage(DataType.STORY);
export const STORY_DELETE_MESSAGE = createDeleteMessage(DataType.STORY);
