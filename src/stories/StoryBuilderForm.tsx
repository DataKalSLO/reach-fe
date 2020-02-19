import { LinearProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Field, Form, FormikProps, withFormik } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import RichTextEditor from './RichTextEditor';
import { contentToRaw } from './draftJsUtility';
import { EditorState } from 'draft-js';

interface FormValues {
  title: string;
  textBlock: EditorState;
}

const MyForm = (props: FormikProps<FormValues>) => {
  const { handleSubmit, isSubmitting } = props;
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Field
          component={TextField}
          name="title"
          label="Title"
          variant="outlined"
        />
        <br />
        <RichTextEditor name="textBlock" />
        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          type="submit"
          startIcon={<SaveIcon />}
        >
          Save Story
        </Button>
        {isSubmitting && <LinearProgress />}
      </Form>
    </div>
  );
};

const MyEnhancedForm = withFormik<FormValues, FormValues>({
  handleSubmit: (values, { setSubmitting }) => {
    const data = {
      title: values.title,
      textBlock: contentToRaw(values.textBlock)
    };
    setTimeout(() => {
      alert(JSON.stringify(data, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(MyForm);

const StoryBuilderForm = () => {
  const initialValues = {
    title: '',
    textBlock: EditorState.createEmpty()
  };

  return <MyEnhancedForm {...initialValues} />;
};

export default StoryBuilderForm;
