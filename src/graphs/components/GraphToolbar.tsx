import { Toolbar } from '@material-ui/core';
import { Delete, Edit, FileCopy, Save, Share } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import Button, { Props as ButtonProps } from '../../common/components/Button';
import {
  deleteGraphAction,
  duplicateGraphAction
} from '../../redux/graphs/actions';
import {
  DELETE_LABEL,
  DUPLICATE_LABEL,
  EDIT_LABEL,
  SAVE_LABEL,
  SHARE_LABEL
} from './constants';
import { GraphHeaderProps } from './types';

/*
 * Contains the buttons rendered on the graph toolbar.
 */

const ToolbarButton = (props: ButtonProps) => {
  return <Button variant="text" color="default" {...props} />;
};

function GraphToolbar({ graph }: GraphHeaderProps) {
  const dispatch = useDispatch();

  // TODO: Collapse toolbar when width is too small
  return (
    <Toolbar>
      <ToolbarButton
        disabled={true}
        label={EDIT_LABEL}
        variant="text"
        color="default"
        startIcon={<Edit />}
        onClick={() => alert('Not implemented')}
      />
      <ToolbarButton
        disabled={true}
        label={SAVE_LABEL}
        startIcon={<Save />}
        onClick={() => alert('Not implemented')}
      />
      <ToolbarButton
        disabled={true}
        label={DUPLICATE_LABEL}
        startIcon={<FileCopy />}
        onClick={() => alert('Not implemented')}
      />
      <ToolbarButton
        disabled={true}
        label={SHARE_LABEL}
        startIcon={<Share />}
        onClick={() => alert('Not implemented')}
      />
      <ToolbarButton
        disabled={true}
        label={DELETE_LABEL}
        startIcon={<Delete color="error" />}
        onClick={() => alert('Not implemented')}
      />
    </Toolbar>
  );
}

export default GraphToolbar;
