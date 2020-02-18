import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TwitterButton from './buttons/TwitterButton';
import FacebookButton from './buttons/FacebookButton';
import LinkedInButton from './buttons/LinkedInButton';
import { useLocation } from 'react-router-dom';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

// match react-share button stylings
const iconStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  padding: '0px',
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer'
};

export default function Toolbar(props: any) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const baseUrl = 'http://inserturlhere.com';
  const graphUrl = `${baseUrl}${location.pathname}`;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        textAlign: 'center',
        position: 'absolute',
        right: '0',
        top: '0'
      }}
    >
      <Button onClick={() => console.log('Do stuff')}>
        <SaveIcon />
      </Button>
      <Button onClick={handleOpen}>
        <ShareIcon />
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Share</h2>
          <p id="simple-modal-description">
            <Button onClick={props.exportChartHandler}>
              <button className="react-share__ShareButton" style={iconStyle}>
                <GetAppIcon />
              </button>
            </Button>
            <LinkedInButton graphUrl={graphUrl} />
            <FacebookButton graphUrl={graphUrl} />
            <TwitterButton graphUrl={graphUrl} />
          </p>
        </div>
      </Modal>
    </div>
  );
}
