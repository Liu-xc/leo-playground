import React from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Form, FormItem, Input, Password, Submit } from '@formily/antd';

const MyValidation: React.FC<any> = (props) => {
  const { username } = props;
  return <div>MyValidation: {username}</div>;
};

const normalForm = createForm({
  validateFirst: true,
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
    MyValidation,
  },
});

const pureSchema = {
  type: 'object',
  properties: {
    phone: {
      type: 'Number',
      title: 'Phone Number',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
};

const SchemaForm = () => (
  <Form form={normalForm}>
    <SchemaField>
      <SchemaField.String
        name="username"
        title="User Name"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaField.Void
        name="verify"
        title="verify"
        x-decorator="FormItem"
        x-component="MyValidation"
        x-reactions={[
          {
            dependencies: ['.username#value'],
            fulfill: {
              state: {
                'component[1].username': '{{$deps[0]}}',
              },
            },
          },
        ]}
      />
    </SchemaField>
    <SchemaField schema={pureSchema} />
  </Form>
);

export default SchemaForm;
