import { Snackbar as CoreSnackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { ALERT_ELEVATION, AUTOHIDE_DURATION } from '../../reach-ui/constants';

// Mimicked from https://material-ui.com/components/snackbars/#customized-snackbars

interface Props {
  open: boolean;
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  snackbarProps?: {
    [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
  alertProps?: {
    [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function Snackbar(props: Props) {
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  // closes automatically after the AUTOHIDE_DURATION
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(!open);
  };

  return (
    <CoreSnackbar
      open={open}
      key={props.message}
      autoHideDuration={AUTOHIDE_DURATION}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      onClose={handleClose}
      {...props.snackbarProps}
    >
      <MuiAlert
        elevation={ALERT_ELEVATION}
        variant="filled"
        onClose={handleClose}
        severity={props.severity}
        {...props.alertProps}
      >
        {props.message}
      </MuiAlert>
    </CoreSnackbar>
  );
}
