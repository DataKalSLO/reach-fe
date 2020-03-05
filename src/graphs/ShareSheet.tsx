import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TwitterButton from './Buttons/TwitterButton';
import FacebookButton from './Buttons/FacebookButton';
//import LinkedInButton from './buttons/LinkedInButton';
import { useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

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

const StyledContainer = styled(Box)({
  textAlign: 'center',
  position: 'absolute',
  right: 0,
  top: 0
});

const StyledButton = styled(Box)({
  backgroundColor: 'transparent',
  border: 'none',
  padding: '0px',
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer'
});

interface ToolbarProps {
  exportChartHandler: () => void;
}

export default interface ToolbarButtonProps {
  graphUrl: string;
}

// Modal code adapted from https://material-ui.com/components/modal/
export default function ShareSheet(props: ToolbarProps) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const baseUrl = 'http://inserturlhere.com';
  const graphUrl = `${baseUrl}${location.pathname}`;

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <StyledContainer>
      <Button onClick={() => console.log('Save to my stuff button clicked')}>
        <SaveIcon />
      </Button>
      <Button onClick={toggleModal}>
        <ShareIcon />
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={toggleModal}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Share</h2>
          <p id="simple-modal-description">
            <Button onClick={props.exportChartHandler}>
              <StyledButton className="react-share__ShareButton">
                <GetAppIcon />
              </StyledButton>
            </Button>
            <FacebookButton graphUrl={graphUrl} />
            <TwitterButton graphUrl={graphUrl} />
          </p>
        </div>
      </Modal>
    </StyledContainer>
  );
}
