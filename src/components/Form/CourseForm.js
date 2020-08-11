import React from 'react';
import moment from 'moment';

import './Form.css';

import { Form, Input, Select, DatePicker } from 'antd';
import Button from '../Button/Button';

const { Option } = Select;
const { TextArea } = Input;

const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
const tailLayout = { wrapperCol: { offset: 16 } };

const CourseForm = (props) => {
  const { handleSubmit, courseTypes, courseLevels, course } = props;
  const [form] = Form.useForm();

  const getInitialValues = () => {
    if (course) {
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

  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }


  return (
    <Form className="add-course" {...layout} form={form} initialValues={getInitialValues()} onFinish={handleSubmit}>
      <Form.Item name="name" label="Course Name"
        rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="type" label="Course Type"
        rules={[{ required: true }]}>
        <Select allowClear>
          {courseTypes.map(item => 
            <Option key={item.value} value={item.value}>{item.label}</Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item name="level" label="Course Level"
        rules={[{ required: true }]}>
        <Select allowClear>
           {courseLevels.map(item => 
            <Option key={item.value} value={item.value}>{item.label}</Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item name="author" label="Author"
        rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="date" label="Start Date"
        rules={[{ required: true }]}>
        <DatePicker disabledDate={disabledDate} />
      </Form.Item>
      <Form.Item name="description" label="Description"
        rules={[{ required: true }]}>
        <TextArea placeholder='Description...' autoSize />
      </Form.Item>
      <Form.Item {...tailLayout}>
        {console.log(!!course)}
        <Button disabled={!!course} onButtonClick={onResetForm} buttonText='Reset' />
        <Button type="primary" htmlType="submit" buttonText={course ? 'Submit' : 'Create'} />
      </Form.Item>
    </Form>
  )
}

export default CourseForm;