import { Box, styled } from '@material-ui/core';
import React from 'react';
import Button from '../../common/components/Button';

interface Props {
  labels: string[];
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
}

export function CreateFormFooter(props: Props) {
  const { labels, activeStep, handleBack, handleNext } = props;
  return (
    <FooterBox>
      <Button
        label={labels[0]}
        disabled={activeStep === 0}
        color="default"
        variant="text"
        onClick={handleBack}
      />
      <Button
        label={labels[1]}
        color="primary"
        variant="contained"
        onClick={handleNext}
      />
    </FooterBox>
  );
}

const FooterBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start'
});
