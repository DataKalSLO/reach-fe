import { Box, styled } from '@material-ui/core';
import React from 'react';
import Button from '../../common/components/Button';
import {
  FORM_CANCEL_LABEL,
  FORM_RESET_LABEL,
  FORM_UPDATE_LABEL
} from './constants';

interface Props {
  isLocalGraph: boolean;
  handleCancel: () => void;
  handleReset: () => void;
  handleUpdate: () => void;
}

export function FormEditFooter(props: Props) {
  return (
    <FooterBox>
      {/* Disable reset button if the graph only exists locally */}
      <Button
        disabled={props.isLocalGraph}
        label={FORM_RESET_LABEL}
        size="large"
        color="default"
        variant="text"
        onClick={props.handleReset}
      />
      <Button
        label={FORM_CANCEL_LABEL}
        size="large"
        color="default"
        variant="text"
        onClick={props.handleCancel}
      />
      <Button
        label={FORM_UPDATE_LABEL}
        size="large"
        color="primary"
        variant="text"
        onClick={props.handleUpdate}
      />
    </FooterBox>
  );
}

const FooterBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end'
});
