import { Snackbar as CoreSnackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { ALERT_ELEVATION, AUTOHIDE_DURATION } from '../../reach-ui/constants';
import { StatusSeverity } from '../../redux/notifications/types';

// Mimicked from https://material-ui.com/components/snackbars/#customized-snackbars

interface Props {
  actionId: string;
  show: boolean;
  message: string;
  severity?: StatusSeverity;
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
  const [show, setShow] = useState(props.show);

  // The snackbar will reappear when a new actionId is given
  useEffect(() => {
    setShow(props.show);
  }, [props.show, props.actionId]);

  // closes automatically after the AUTOHIDE_DURATION
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShow(!show);
  };

  return (
    <CoreSnackbar
      open={show}
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
