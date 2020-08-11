import React from 'react';

import { Modal } from 'antd';

const PopupModal = (props) => {
  const { title, showModal, closeModal, children } = props;
  return (
    <Modal
      visible={showModal}
      title={title}
      onCancel={closeModal}
      footer={null}
      mask={true}
      maskClosable={false}>
      {children}
    </Modal>
  )
}

export default PopupModal;