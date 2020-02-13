import React from 'react';
import { Button, LinearProgress } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';

function StoryBuilderForm() {
  return (
    // NOTE: validation isn't currently needed, but we'll use yup
    //   https://github.com/jquense/yup

    <Formik
      initialValues={{
        title: ''
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
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
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
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
