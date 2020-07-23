import React from 'react';
import { Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';

const layout = { labelCol: { span: 6 }, wrapperCol: {span: 16 }};
const tailLayout = { wrapperCol: { offset: 16 }};

const AddCourse = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;

  const closePopup = () => props.showAddCourse(false);

  const getInitialValues = () => {
    if (props.course) {
    const { name, author, type, level, description, date } = props.course;
      return {
        author,
        name,
        type,
        level: parseInt(level),
        description,
        date: moment(date, 'YYYY/MM/DD')
      }
    }
  }

  const onResetForm = () => {
    form.resetFields();
  };
  
  const handleSubmit = (values) => {
    values.date = values.date.format('YYYY/MM/DD');
    props.handleCourse(values);
    closePopup();
  };

  const disabledDate = (current) => {
  return current && current < moment().endOf('day');
}

  return (
    <>
    <Modal
      visible={true}
      title= {props.course ? 'Edit Course' : 'Create Course'}
      onCancel={closePopup}
      footer={null}
      mask={true}
      maskClosable={false}>
      <Form className="add-course" {...layout} form={form} initialValues={getInitialValues()} onFinish={handleSubmit}>
        <Form.Item name="name" label="Course Name"
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Course Type"
        rules={[{ required: true }]}>
          <Select allowClear>
            <Option value="Business and Management">Business and Management</Option>
            <Option value="Computer Science">Computer Science</Option>
            <Option value="Humanities">Humanities</Option>
            <Option value="Data Analysis and Statistics">Data Analysis and Statistics</Option>
            <Option value="Economics and Finance">Economics and Finance</Option>
            <Option value="Art and Culture">Art and Culture</Option>
          </Select>
        </Form.Item>
        <Form.Item name="level" label="Course Level"
          rules={[{ required: true }]}>
          <Select allowClear>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </Form.Item>
         <Form.Item name="author" label="Author"
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="date" label="Start Date"
          rules={[{ required: true }]}>
          <DatePicker  disabledDate={disabledDate}/>
        </Form.Item>
        <Form.Item name="description" label="Description"
          rules={[{ required: true }]}>
          <TextArea placeholder='Description...' autoSize />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="button" disabled={props.course} onClick={onResetForm}>Reset</Button>
          <Button type="primary" htmlType="submit">{props.course ? 'Submit' : 'Create'}</Button>
        </Form.Item>
      </Form>
    </Modal>
    </>
  )
}

export default AddCourse;