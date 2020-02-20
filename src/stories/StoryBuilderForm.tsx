import React, { useRef, useState } from 'react';
import { Button, LinearProgress } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import RichTextEditor, { contentToRaw } from './RichTextEditor';

function StoryBuilderForm() {
  const [textBlock, setTextBlock] = useState();

  return (
    // NOTE: validation isn't currently needed, but we'll use yup
    //   https://github.com/jquense/yup

    <Formik
      initialValues={{
        title: ''
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          const data = {
            ...values,
            textBlock: contentToRaw(textBlock)
          };
          setSubmitting(false);
          alert(JSON.stringify(data, null, 2));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            name="title"
            label="Title"
            variant="outlined"
          />
          <br />
          {/* FIXME: @tanner refactor into a custom field
              https://hceris.com/custom-components-in-formik/
          */}
          <RichTextEditor sendData={(v: any) => setTextBlock(v)} />
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
            startIcon={<SaveIcon />}
          >
            Save Story
          </Button>
          {isSubmitting && <LinearProgress />}
        </Form>
      )}
    </Formik>
  );
}

export default StoryBuilderForm;
