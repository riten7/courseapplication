/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Card, Rate, Button, Spin, Table, Space } from 'antd';
import AddCourse from './AddCourse';
import ConfirmationPoup from './ConfirmationPopup';
import useHandlePopup from './useHandlePopup';
import {
  deleteCourseFromList,
  getCourseDetailById,
  updateCourseInList,
  updateCourseFilesInList
} from '../actions/actionCreators';
import { useHistory } from 'react-router-dom';
import UploadFile from './UploadFile';
import ErrorMessage from './ErrorMessage';
import { bytesToSize, getDate } from '../utils/utility';

const CourseDetail = (props) => {
  const courseId = props.match.params.id;
  const handlePopup = useHandlePopup();

  const dispatch = useDispatch();
  const history = useHistory();

  const [editCourseVisible, showEditCourse] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const { course, status } = useSelector(state => state.courseDetail);

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
          <a onClick={() => handleDeleteFile(record)}>Delete</a>
        </Space>
      ),
    }
  ];

  useEffect(() => {
    dispatch(getCourseDetailById(courseId));
  }, [courseId, dispatch]);

  useEffect(() => {
    if (status === 'completed') {
      showEditCourse(false);
    }
    if (status === 'delete_completed') {
      history.push('/');
    }
  }, [status, history]);

  const setPopupState = (value) => showEditCourse(value);

  const handleCourse = (values) => {
    const updatedCourse = {
      ...values,
      id: course.id,
      files: course.files,
    }
    dispatch(updateCourseInList(updatedCourse, courseId));
  }

  const closePopup = () => setDeletePopup(false);

  const handleDeleteCourse = () => {
    closePopup();
    dispatch(deleteCourseFromList(courseId));
  };

  const handleDeleteBtn = () => setDeletePopup(true);

  const handleUpload = (value) => {
    handlePopup.setShowPopup(value);
  }

  const handleUpdateFiles = (fileList) => {
    const updatedCourse = {
      ...course,
      updatedFiles: fileList,
    }
    dispatch(updateCourseFilesInList(updatedCourse, courseId));
  }

  const handleBackBtn = () => history.push('/');

  const handleDeleteFile = (file) => {
    const updatedCourse = {
      ...course,
      files: course.files.filter(item => item.id !== file.id),
    };
    delete updatedCourse._id;
    dispatch(updateCourseInList(updatedCourse, courseId));
  }

  const getFileList = (list) => {
    const data = list.map(item => {
      return {
        ...item,
        //date: moment(item.lastModifiedDate).format('YYYY/MM/DD'),
        size: bytesToSize(item.size),
        type: item.mimetype.split("/")[0]
      }
    });
    return data;
  }

  return (
    <div className="courseDetail">
      <Spin className="spinner" spinning={status === 'loading'}>
        {status === 'completed' &&
          <Card>
            <Row className="courseDetail-header">
              <Col span={10}>
                <h1>Course Information</h1>
              </Col>
              <Col span={14}>
                <Button className="addFileBtn" onClick={() => handleUpload(true)}>Upload Files</Button>
              </Col>
            </Row>
            <Row>
              <Col span={10} className="courseDetail-info">
                <h2>{course.name || ''}</h2>
                <div><strong>Author: </strong>{course.author || ''}</div>
                <div><strong>Start Date: </strong> {getDate(course.date) || ''} </div>
                <div><strong>Course Type: </strong>{course.type || ''}</div>
                <div><strong>Course Level: </strong> <Rate className='rate' value={parseInt(course.level) || 0} /></div>
                <div><strong>Description: </strong>
                  {course.description || ''}</div>
                <hr />
                <div className="actions-course">
                  <Button className="editCourseBtn" onClick={setPopupState}>Edit Info</Button>
                  <Button className="deleteCourseBtn" onClick={handleDeleteBtn}>Delete Course</Button>
                  <Button className="goBackBtn" onClick={handleBackBtn}>Back Home</Button>
                </div>
              </Col>
              <Col span={14} className="courseDetail-files">
                <Table
                  rowKey={Math.random()}
                  dataSource={getFileList(course.files)}
                  columns={columns}
                  pagination={{ pageSize: 5 }}
                ></Table>
              </Col>
            </Row>
          </Card>}
        {status === 'error' && <ErrorMessage title="Something went wrong. Please try again later!" />}
      </Spin>

      {editCourseVisible ? <AddCourse
        course={course}
        handleCourse={handleCourse}
        showAddCourse={showEditCourse} /> : null}

      {deletePopup ? <ConfirmationPoup title={course.name}
        closePopup={closePopup}
        handleDeleteCourse={handleDeleteCourse} /> : null}

      {handlePopup.show ? <UploadFile
        show={handlePopup.show}
        files={course.files}
        handleUpload={handleUpload}
        updateFiles={handleUpdateFiles} /> : null}
    </div>
  )
}

export default CourseDetail;