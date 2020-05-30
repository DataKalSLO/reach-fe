import { Share } from '@material-ui/icons';
import React from 'react';
import ShareDrawer from '../../share/ShareDrawer';
import { SHARE_LABEL } from './constants';
import { ToolbarButton } from './GraphToolbar';

//TODO: shareURL needs to be changed to reflect static image of current graph
//pass static image URL as props to this component
export default function GraphShareButton() {
  const [drawerVisible, setDrawerVisible] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  return (
    <div>
      <ToolbarButton
        disabled={true}
        label={SHARE_LABEL}
        startIcon={<Share />}
        onClick={handleDrawerOpen}
      />
      <ShareDrawer
        openCallback={handleDrawerOpen}
        closeCallback={handleDrawerClose}
        isOpen={drawerVisible}
        shareURL="https://production.d1t7lxoixksik3.amplifyapp.com/"
      />
    </div>
  );
}
