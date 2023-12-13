import React, { useMemo } from 'react';
import { Modal } from 'antd';
import type { TableItem } from '../data.d';
import { allRoles } from '@/services/ant-design-pro/api';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import {
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayItems,
  ArrayCards,
  FormButtonGroup,
} from '@formily/antd-v5';
import { Card, Slider, Rate } from 'antd';
import CustomImageUpload from '@/components/Formily/CustomImageUpload';

export interface UpdateFormProps {
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: Partial<TableItem>) => void;
  updateModalVisible: boolean;
  values: Partial<TableItem>;
}

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayItems,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
    CustomImageUpload,
  },
});

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { onSubmit, onCancel: handleUpdateModalVisible, updateModalVisible, values } = props;
  values.roles = values.id ? values.roles : [];
  const form = useMemo(
    () =>
      createForm({
        initialValues: values,
        effects() {
          allRoles().then((res) => {
            const items: any = [];
            res.data.forEach((item: any) => {
              items.push({ label: item.name, value: item.id });
            });
            form.setFieldState('roles', { dataSource: items });
          });
        },
      }),
    [values],
  );

  return (
    <Modal
      destroyOnClose
      title={values.id ? '修改' : '添加'}
      open={updateModalVisible}
      footer={null}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form form={form} labelCol={6} wrapperCol={16}>
        <SchemaField>
          <SchemaField.String
            name="avatar"
            title="头像"
            x-decorator="FormItem"
            x-component="CustomImageUpload"
            x-component-props={{
              multiple: false,
              maxCount: 1,
            }}
          />
          <SchemaField.String
            name="username"
            title="账号"
            x-decorator="FormItem"
            x-component="Input"
            x-component-props={{
              disabled: values.id ? true : false,
            }}
          />
          <SchemaField.String
            name="roles"
            title="角色"
            x-decorator="FormItem"
            x-component="Select"
            x-component-props={{
              mode: 'multiple',
            }}
          />
          <SchemaField.String
            name="nickname"
            title="昵称"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="mobile"
            title="手机号"
            x-decorator="FormItem"
            x-component="Input"
            x-component-props={{
              disabled: values.id ? true : false,
            }}
          />
          <SchemaField.String
            name="password"
            title="密码"
            x-decorator="FormItem"
            x-component="Input"
            x-component-props={{
              placeholder: '为空不修改密码',
            }}
          />
          <SchemaField.String
            name="status"
            title="状态"
            x-decorator="FormItem"
            x-component="Select"
            enum={[
              { label: '禁用', value: 0 },
              { label: '正常', value: 1 },
            ]}
            required
          />
        </SchemaField>
        <FormButtonGroup.FormItem>
          <Reset>重置</Reset>
          <Submit onSubmit={onSubmit}>提交</Submit>
        </FormButtonGroup.FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
