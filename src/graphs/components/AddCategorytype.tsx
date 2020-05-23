import { Divider, styled } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import FormBlock from '../../common/components/FormBlock';
import { TextFieldSelect } from '../../common/components/FormSelectionField';

const categories = [
  'Industry',
  'Demographics',
  'Assets',
  'Education',
  'Housing and Living',
  'Health'
];

const CATEGORY_LABEL = 'Choose a Category:';

function AddCategoryType() {
  const [CategoryState, setCategoryState] = useState({
    category: categories[0]
  });

  const handleCategoryChange = (id: string, selectedCategory: string) => {
    setCategoryState({ ...CategoryState, category: selectedCategory });
  };

  return (
    <Fragment>
      <FormBlock label={CATEGORY_LABEL}>
        <TextFieldSelect
          fullWidth
          required
          id="Category"
          label="Category"
          value={CategoryState.category}
          data={categories}
          handleChange={handleCategoryChange}
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
