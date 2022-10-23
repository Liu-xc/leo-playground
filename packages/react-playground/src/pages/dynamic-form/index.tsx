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
import SchemaForm from './SchemaForm';

const DynamicFormPlayground = () => {
  const form = createForm();
  return (
    <div>
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
      <SchemaForm />
    </div>
  );
};

export default DynamicFormPlayground;
