import { Share } from '@material-ui/icons';
import React from 'react';
import ShareMenu from '../../share/ShareMenu';
import { SHARE_LABEL } from './constants';
import { ToolbarButton } from './GraphToolbar';
import { onClickWithEventType } from '../../common/components/Button';

interface GraphShareButtonProps {
  snapshotUrl: string;
  graphTitle: string;
}

export default function GraphShareButton(props: GraphShareButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ToolbarButton
        label={SHARE_LABEL}
        startIcon={<Share />}
        onClick={handleClick as onClickWithEventType}
      />
      <ShareMenu
        id="graph-share-menu"
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        shareURL={props.snapshotUrl}
        title={props.graphTitle}
        closeMenuCallback={handleClose}
      />
    </div>
  );
}
