import { Button } from '@material-ui/core';
import React from 'react';
// import { Menu } from '../../reach-ui/core';
import { PublicationStatus, Story } from '../../redux/story/types';

export default function StoryStatusMenu(props: { story: Story }) {
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const StatusButton = (props: { status: PublicationStatus }) => {
    let label = 'DRAFT';
    let backgroundColor = 'goldenrod';

    if (props.status === PublicationStatus.FEEDBACK) {
      label = 'FEEDBACK';
      backgroundColor = 'lightblue';
    } else if (props.status === PublicationStatus.PUBLISHED) {
      label = 'PUBLISHED';
      backgroundColor = 'yellowgreen';
    } else if (props.status === PublicationStatus.REVIEW) {
      label = 'REVIEW';
      backgroundColor = 'lightgray';
    }

    return (
      <Button
        variant="contained"
        disableElevation
        disableFocusRipple
        disableRipple
        disableTouchRipple
        style={{ backgroundColor: backgroundColor, marginRight: '10px' }}
      >
        {label}
      </Button>
    );
  };

  return (
    <>
      <StatusButton status={props.story.publicationStatus} />

      {/* TODO: disabled for the sake of the demo, should be reconnected soon */}
      {/* <Button
        aria-controls="story-status-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="story-status-menu"
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        open={Boolean(anchorEl)}
        marginTop="40px"
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu> */}
    </>
  );
}
