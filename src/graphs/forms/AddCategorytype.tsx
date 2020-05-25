import { Divider, styled } from '@material-ui/core';
import React, { Fragment, ChangeEvent } from 'react';
import FormBlock from '../../common/components/FormBlock';
import { TextFieldSelect } from '../../common/components/FormSelectionField';
import {
  ASSETS,
  DEMOGRAPHICS,
  EDUCATION,
  HEALTH,
  HOUSING,
  INDUSTRY
} from '../../redux/graphbuilder/constants';
import { CATEGORY_LABEL, INPUT_CATEGORY_LABEL } from './constants';

interface Props {
  category: string;
  handleChange: (category: string) => void;
}

const initiativeNames = [
  INDUSTRY,
  DEMOGRAPHICS,
  ASSETS,
  EDUCATION,
  HOUSING,
  HEALTH
];

function AddCategoryType(props: Props) {
  return (
    <Fragment>
      <FormBlock label={CATEGORY_LABEL}>
        <TextFieldSelect
          label={INPUT_CATEGORY_LABEL}
          value={props.category}
          data={initiativeNames}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            props.handleChange(e.target.value)
          }
        />
      </FormBlock>
      <FormDivider light />
    </Fragment>
  );
}

export default AddCategoryType;

const FormDivider = styled(Divider)({
  margin: '10px 0px 10px 0px'
});
