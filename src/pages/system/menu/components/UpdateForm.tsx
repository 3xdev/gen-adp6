import React, { useMemo } from 'react';
import { Modal } from 'antd';
import { createForm, onFieldReact } from '@formily/core';
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
import { getList } from '../service';
import { allTables, getDicts } from '@/services/ant-design-pro/api';

const Text: React.FC<{
  value?: string;
  content?: string;
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p';
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode;
  return React.createElement(tagName, props, value || content);
};

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
    Text,
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
  },
});

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: any) => void;
  updateModalVisible: boolean;
  values: any;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, values, onCancel, onSubmit } = props;

  const form = useMemo(
    () =>
      createForm({
        initialValues: values,
        effects() {
          getList().then((res) => {
            const items: any = [];
            items.push({ value: 0, label: '无' });
            res.data.forEach((item: any) => {
              items.push({ value: item.id, label: item.name });
            });
            form.setFieldState('parent_id', { dataSource: items });
          });
          allTables().then((res) => {
            const items: any = [];
            items.push({ value: '', label: '无' });
            res.data.forEach((item: any) => {
              items.push({ value: item.code, label: item.name });
            });
            form.setFieldState('table_code', { dataSource: items });
          });
          getDicts('common_status').then((res) => {
            form.setFieldState('status', { dataSource: res.items });
          });

          onFieldReact('parent_id', (field) => {
            field.disabled = values.id ? true : false;
          });
          onFieldReact('path', (field) => {
            field.setState({ required: field.query('parent_id').value() === 0 ? false : true });
          });
          onFieldReact('icon', (field) => {
            field.display = field.query('parent_id').value() === 0 ? 'visible' : 'none';
          });
        },
      }),
    [values],
  );

  return (
    <Modal
      destroyOnClose
      title={values.id ? '编辑' : '添加'}
      width={640}
      open={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form form={form} labelCol={6} wrapperCol={16}>
        <SchemaField>
          <SchemaField.Markup
            name="parent_id"
            title="上级"
            x-decorator="FormItem"
            x-component="Select"
            required
          />
          <SchemaField.String
            name="name"
            title="名称"
            x-decorator="FormItem"
            x-component="Input"
            required
          />
          <SchemaField.String
            name="path"
            title="访问路由"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="table_code"
            title="关联表格"
            x-decorator="FormItem"
            x-component="Select"
          />
          <SchemaField.String
            name="icon"
            title="图标"
            x-decorator="FormItem"
            x-component="Select"
            enum={['', 'book', 'crown', 'heart', 'link', 'setting', 'smile', 'table']}
          />
          <SchemaField.Number
            name="sort"
            title="排序"
            x-decorator="FormItem"
            x-component="NumberPicker"
          />
          {values.id && (
            <SchemaField.Markup
              name="status"
              title="状态"
              x-decorator="FormItem"
              x-component="Select"
            />
          )}
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
