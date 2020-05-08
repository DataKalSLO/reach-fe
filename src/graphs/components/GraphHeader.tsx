import { Delete, Edit, FileCopy, Save, Share } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../common/components/Button';
import {
  deleteGraphAction,
  duplicateGraphAction
} from '../../redux/graphs/actions';
import {
  DELETE_LABEL,
  DUPLICATE_LABEL,
  EDIT_LABEL,
  SAVE_LABEL
} from './constants';
import { StyledToolbar } from './styles';
import { GraphHeaderProps } from './types';

/*
 * Contains the buttons rendered on the header of a graph.
 */

function GraphHeader({ graph }: GraphHeaderProps) {
  const dispatch = useDispatch();
  const getHeaderButtons = (): JSX.Element[] => {
    return [
      <Button
        key={DELETE_LABEL}
        label={DELETE_LABEL}
        color="default"
        variant="text"
        startIcon={<Delete color="error" />}
        onClick={() => {
          dispatch(deleteGraphAction(graph.id));
        }}
      />,
      <Button
        key={SAVE_LABEL}
        label={SAVE_LABEL}
        variant="text"
        color="default"
        startIcon={<Save />}
        onClick={() => alert('Not implemented')}
      />,
      <Button
        key={EDIT_LABEL}
        label={EDIT_LABEL}
        variant="text"
        color="default"
        startIcon={<Edit />}
        onClick={() => alert('Not implemented')}
      />,
      <Button
        key={DUPLICATE_LABEL}
        label={DUPLICATE_LABEL}
        variant="text"
        color="default"
        startIcon={<FileCopy />}
        onClick={() => {
          dispatch(duplicateGraphAction(graph.options));
        }}
      />,
      <Button
        key={'Share'}
        label="Share"
        variant="text"
        color="default"
        startIcon={<Share />}
        onClick={() => alert('Not implemented')}
      />
    ];
  };

  // TODO: Collapse toolbar when width is too small
  return <StyledToolbar>{getHeaderButtons()}</StyledToolbar>;
}

export default GraphHeader;
