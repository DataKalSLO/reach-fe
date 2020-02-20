import React from 'react';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import 'date-fns';

interface PickerProps {
  id: string;
  label: string;
}

// add a props: Array<string> in parameters but I get some errors
export function MaterialUIPickers(props: PickerProps) {
  const { id, label } = props;
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    // no input defaults to today's date
    new Date()
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-evenly">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id={id}
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default MaterialUIPickers;
