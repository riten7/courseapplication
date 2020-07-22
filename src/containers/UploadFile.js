import React from 'react';
import { Modal, Upload, Form, Button, Alert, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { checkForDuplicates } from '../utils/filter';

const UploadFile = (props) => {
  const [error, setError] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState([{}]);

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
    setError(isDuplicateFileAvailable(e.fileList))
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
      title= 'Add Files'
      visible={props.show}
      mask={true}
      maskClosable={false}
      footer={null}
      onCancel={closePopup}>
      <Form onFinish={onFinish}>
        {error && <Alert
          message="Error Text"
          description=""
          type="error"
          showIcon
        />}
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
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item className="upload-actions">
          <Button htmlType="button" onClick={closePopup}>Cancel</Button>
          <Button type="primary" htmlType="submit" disabled={error || selectedFiles.length < 1}>Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UploadFile;