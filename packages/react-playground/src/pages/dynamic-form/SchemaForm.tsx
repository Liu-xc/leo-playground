import React from 'react';
import { createForm, onFieldValueChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Form, FormItem, Input, Password } from '@formily/antd';

const MyValidation: React.FC<any> = (props) => {
  const { username } = props;
  return <div>MyValidation: {username}</div>;
};

const normalForm = createForm({
  validateFirst: true,
  effects() {
    onFieldValueChange('username', (field) => {
      normalForm.setFieldState('age', (state) => {
        if (!field.value) {
          state.value = undefined;
        }
      });
    });
  },
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
        x-reactions={{
          dependencies: ['age'],
          target: 'doubleAge',
          effects: [
            'onFieldInit',
            'onFieldValueChange',
            'onFieldInputValueChange',
          ],
          fulfill: {
            state: {
              value: '{{$deps[0] ? $deps[0] * 2 : undefined}}',
            },
          },
        }}
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
      <SchemaField.Number
        name="age"
        title="User Age"
        required
        x-decorator="FormItem"
        x-component="Input"
        // x-reactions={[
        //   {
        //     dependencies: ['.username#value'],
        //     target: '.double-age',
        //     fulfill: {
        //       state: {
        //         'component[1].value': '{{$deps[0]}}',
        //       },
        //     },
        //   },
        // ]}
      />
      <SchemaField.Number
        name="doubleAge"
        title="Double Age"
        x-decorator="FormItem"
        x-component="Input"
      />
    </SchemaField>
    <SchemaField schema={pureSchema} />
  </Form>
);

export default SchemaForm;
