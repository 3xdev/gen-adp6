import { Engine } from '@pind/designable-core';
import { transformToSchema, transformToTreeNode } from '@pind/designable-formily-transformer';
import { message } from 'antd';
import { history } from '@umijs/max';
import { getList, updateItem } from '../../service';

export const saveSchema = async (designer: Engine) => {
  let code = location.pathname.split('/')[3];
  let parse = (await getList({ code })).data[0];
  let stringify: any = designer.getCurrentTree();
  parse.schema_string = JSON.stringify(transformToSchema(stringify).schema);
  updateItem(parse).then(() => {
    message.success('保存完成');
    history.push('/system/form');
  });
};

export const loadInitialSchema = (designer: Engine) => {
  try {
    let code = location.pathname.split('/')[3];
    getList({ code: code }).then((res) => {
      if (!Array.isArray(res.data[0].schema) && res.data[0].schema !== 'null') {
        let properties = res.data[0].schema;
        function recursion(perties: any) {
          let pertiesKey = Object.keys(perties);
          for (let k of pertiesKey) {
            if (Array.isArray(perties[k]['x-component-props'])) {
              perties[k]['x-component-props'] = {};
            }
            if (Array.isArray(perties[k]['x-decorator-props'])) {
              perties[k]['x-decorator-props'] = {};
            }
            if (typeof perties[k] === 'object') {
              recursion(perties[k]);
            }
          }
        }
        recursion(properties);
        res.data[0].schema = {
          form: {
            labelCol: 6,
            wrapperCol: 12,
          },
          schema: properties,
        };
        designer.setCurrentTree(transformToTreeNode(res.data[0].schema));
      } else {
        designer.setCurrentTree(transformToTreeNode({}));
      }
    });
  } catch {}
};
