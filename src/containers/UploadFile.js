import React from 'react';
import { Modal, Upload, Form, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { checkForDuplicates } from '../utils/utility';
import AlertMessage from './AlertMessage';

const UploadFile = (props) => {
  const [error, setError] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const onRemoveFile = (removedFile) => {
    const files = selectedFiles.filter(file => file.uid === removedFile.uid);
    setSelectedFiles(files);
  }

  const closePopup = () => {
    props.handleUpload(false);
  }

  const normFile = e => {
    if (e.fileList.length > 5) {
      message.error('You can only upload maximum 5 files!');
      return;
    }
    setError(isDuplicateFileAvailable(e.fileList));
    setSelectedFiles(e.fileList);
    return e && e.fileList;
  };

  const isDuplicateFileAvailable = (files) => {
    return checkForDuplicates(files, 'name');
  }

  const onFinish = _ => {
    props.updateFiles(selectedFiles);
    closePopup();
  };

  return (
    <Modal
      title= 'Upload Files'
      visible={props.show}
      mask={true}
      maskClosable={false}
      footer={null}
      onCancel={closePopup}>
      <Form onFinish={onFinish}>
        {error && <AlertMessage message="Error" description="Found duplicate files, you may already have uploaded the same files!!" />}
        <Form.Item name="uploadedFiles" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files"
            listType="picture"
            multiple={true}
            accept=".pdf,.pptx,.docx,.xlsx, .jpg, .jpeg, .png"
            onRemove={onRemoveFile}
            beforeUpload={() => false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text"><strong>Drag and drop or BROWSE files</strong></p>
            <p className="ant-upload-hint">.pdf,.pptx,.docx,.xlsx, .jpg, .jpeg, .png files only (Max size 50MB)</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item className="upload-actions">
          <Button htmlType="button" onClick={closePopup}>Cancel</Button>
          <Button type="primary" htmlType="submit" disabled={error || selectedFiles.length < 1}>Done</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UploadFile;