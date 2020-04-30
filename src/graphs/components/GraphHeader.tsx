import { Delete, Edit, FileCopy, Save, Share } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../common/components/Button';
import {
  deleteGraphAction,
  duplicateGraphAction,
  editingGraphAction
} from '../../redux/graphs/actions';
import {
  DEFAULT_KEY,
  DELETE_LABEL,
  DUPLICATE_LABEL,
  EDIT_LABEL,
  SAVE_LABEL
} from './constants';
import { StyledHeaderGrid } from './styles';
import { GraphHeaderProps } from './types';

/*
 * Contains the buttons rendered on the header of a graph.
 * Note: defaultFlag is only used to prevent the user from
 *       deleting and duplicating the default graph. This
 *       will get removed when we connect to the backend.
 */

function GraphHeader({ graph }: GraphHeaderProps) {
  const dispatch = useDispatch();
  // TODO: change the way default graphs are handled
  const defaultFlag = graph.id === DEFAULT_KEY;

  return (
    <StyledHeaderGrid container>
      <Button
        label={DELETE_LABEL}
        color="default"
        variant="text"
        startIcon={<Delete color="error" />}
        onClick={() => {
          if (!defaultFlag) {
            dispatch(deleteGraphAction(graph.id));
          }
        }}
      />
      <Button
        label={SAVE_LABEL}
        variant="text"
        color="default"
        startIcon={<Save />}
        onClick={() => alert('Not implemented')}
      />
      <Button
        label={EDIT_LABEL}
        variant="text"
        color="default"
        startIcon={<Edit />}
        onClick={() => {
          dispatch(editingGraphAction(graph.id));
        }}
      />
      <Button
        label={DUPLICATE_LABEL}
        variant="text"
        color="default"
        startIcon={<FileCopy />}
        onClick={() => {
          if (!defaultFlag) {
            dispatch(duplicateGraphAction(graph.options));
          }
        }}
      />
      <Button
        label="Share"
        variant="text"
        color="default"
        startIcon={<Share />}
        onClick={() => alert('Not implemented')}
      />
    </StyledHeaderGrid>
  );
}

export default GraphHeader;
