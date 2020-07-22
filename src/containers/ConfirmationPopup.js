import React from 'react';
import { Modal } from 'antd';

const ConfirmationPopup = (props) => {
  const handleCancel = () => props.closePopup();
  const handleOk = () => props.handleDeleteCourse();
  return (
    <Modal
      title="Confirm"
      visible={true}
      onOk={handleOk}
      onCancel={handleCancel}>
      <p>Are you sure you want to delete course {props.title} ?</p>
    </Modal>
  )
};

export default ConfirmationPopup;