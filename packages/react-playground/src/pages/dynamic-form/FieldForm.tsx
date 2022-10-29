import React from 'react';
import { createForm } from '@formily/core';
import { FormProvider, Field, FormConsumer } from '@formily/react';
import {
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Submit,
} from '@formily/antd';

const FieldForm = () => {
  const form = createForm();

  return (
    <FormProvider form={form}>
      <FormLayout layout={'vertical'}>
        <Field
          name="input"
          title="input box"
          required
          initialValue="hello"
          decorator={[FormItem]}
          component={[Input, { value: 'world' }]}
        />
      </FormLayout>
      <FormConsumer>{() => <div>{form.values.input}</div>}</FormConsumer>
      <FormButtonGroup>
        <Submit onSubmit={() => console.log(form.values)}>submit</Submit>
      </FormButtonGroup>
    </FormProvider>
  );
};

export default FieldForm;
