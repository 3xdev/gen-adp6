import React from 'react';
import { Modal } from 'antd';
import CrudTable from '@/components/CrudTable';

export interface ModalTableProps {
  onCancel: () => void;
  updateModalVisible: boolean;
  title: string;
  table: string;
  query?: Record<string, any>;
  modalProps?: Record<string, any>;
  crudTableProps?: Record<string, any>;
}

const ModalTable: React.FC<ModalTableProps> = (props) => {
  const { onCancel, updateModalVisible, title, table, query, modalProps, crudTableProps } = props;

  return (
    <Modal
      destroyOnClose
      title={title}
      open={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
      {...modalProps}
    >
      <CrudTable {...crudTableProps} table={table} query={query} />
    </Modal>
  );
};

export default ModalTable;
