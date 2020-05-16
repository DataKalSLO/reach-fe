import React, { useState, Fragment } from 'react';
import { Box, styled, Divider } from '@material-ui/core';
import FormBlock from './FormBlock';
import { FormSelectionField } from './FormSelectionField';

const categories = [
  'Industry',
  'Demographics',
  'Assets',
  'Education',
  'Housing and Living',
  'Health'
];

const CATEGORY_LABEL = 'Choose a Category:';

function AddCategoryTypeforGraph() {
  const [CategoryState, setCategoryState] = useState({
    category: categories[0]
  });

  const handleCategoryChange = (id: string, selectedCategory: string) => {
    setCategoryState({ ...CategoryState, category: selectedCategory });
  };

  return (
    <Fragment>
      <FormBlock label={CATEGORY_LABEL}>
        <FormSelectionField
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

export default AddCategoryTypeforGraph;

const FormDivider = styled(Divider)({
  margin: '10px 0px 10px 0px'
});
