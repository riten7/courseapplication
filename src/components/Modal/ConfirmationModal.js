import React from 'react';
import { Modal } from 'antd';

const ConfirmationModal = (props) => {
  const {show, title, handleClose, handleConfirm} = props;
  const handleCancel = () => handleClose();
  const handleOk = () => handleConfirm();
  return (
    <Modal
      title="Confirm"
      visible={show}
      onOk={handleOk}
      onCancel={handleCancel}>
      <p>Are you sure you want to delete course {title} ?</p>
    </Modal>
  )
};

export default ConfirmationModal;