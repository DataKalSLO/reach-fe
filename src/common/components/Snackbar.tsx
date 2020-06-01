import { Snackbar as CoreSnackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';

export interface Props {
  open: boolean;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
  message: string;
  snackbarProps?: {
    // This extra parameter is necessary to allow other props to be passed through
    [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
  alertProps?: {
    // This extra parameter is necessary to allow other props to be passed through
    [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

export function Snackbar(props: Props) {
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  // closes automatically after the "autoHideDuration"
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(!open);
  };

  return (
    <CoreSnackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      onClose={handleClose}
      {...props.snackbarProps}
    >
      <MuiAlert
        elevation={6}
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
