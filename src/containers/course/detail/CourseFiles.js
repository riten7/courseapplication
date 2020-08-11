/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { Table, Space } from 'antd';

import { bytesToSize } from '../../../utils/utility';

const CourseFiles = ({ course }) => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'originalname',
      key: 'originalname',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'File Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href={record.path} target="_blank" rel="noopener noreferrer">View</a>
          {/* <a onClick={() => handleDeleteFile(record)}>Delete</a> */}
        </Space>
      ),
    }
  ];

  const getFileList = (list) => {
    const data = list.map(item => {
      return {
        ...item,
        size: bytesToSize(item.size),
        type: item.mimetype.split("/")[0]
      }
    });
    return data;
  }

  return (
    <div className="course--files">
    
    <Table
      rowKey={Math.random()}
      dataSource={getFileList(course.files)}
      columns={columns}
      pagination={{ pageSize: 5 }}
    ></Table>
    </div>
  )
}

export default CourseFiles;