// Stub for common component: IconButton
//
//   common components are esentially wrappers for Material UI components
//   we are creating wrappers in order to maintain consistent style between all teams
//
//   if you need a component that hasn't been implemented go ahead and set it up!
//     docs:  https://material-ui.com/
//   after implementing the component request someone from the React team for review

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import EditIcon from '@material-ui/icons/Edit';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TableChartIcon from '@material-ui/icons/TableChart';

// trash bin
const DeleteButton = () => (
  <IconButton aria-label="delete">
    <DeleteIcon />
  </IconButton>
);
export { DeleteButton };

// floppy disk
const SaveButton = () => (
  <IconButton aria-label="save">
    <SaveIcon />
  </IconButton>
);
export { SaveButton };

// plus sign in black square
const AddButton = () => (
  <IconButton aria-label="add">
    <AddBoxIcon />
  </IconButton>
);
export { AddButton };

// looks like download - couldn't really find the right one
const ExportButton = () => (
  <IconButton aria-label="export">
    <SaveAltIcon />
  </IconButton>
);
export { ExportButton };

// diagonal pen
const EditButton = () => (
  <IconButton aria-label="edit">
    <EditIcon />
  </IconButton>
);
export { EditButton };

// calendar
const SelectDateButton = () => (
  <IconButton aria-label="select-date">
    <CalendarTodayIcon />
  </IconButton>
);
export { SelectDateButton };

// data table
const ViewDataTableButton = () => (
  <IconButton aria-label="view-data-table">
    <TableChartIcon />
  </IconButton>
);
export { ViewDataTableButton };

// can't find the right button for duplicate
