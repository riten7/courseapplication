import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Card, Rate, Button, Spin, Table } from 'antd';
import moment from 'moment';
import AddCourse from './AddCourse';
import ConfirmationPoup from './ConfirmationPopup';
import useHandlePopup from './useHandlePopup';
import { deleteCourseFromList, getCourseDetailById, updateCourseInList } from '../actions/actionCreators';
import { useHistory } from 'react-router-dom';
import UploadFile from './UploadFile';
import { columns, bytesToSize } from '../utils/utility';

const CourseDetail = (props) => {
  const courseId = props.match.params.id;
  const handlePopup = useHandlePopup();

  const dispatch = useDispatch();
  const history = useHistory();

  const [editCourseVisible, showEditCourse] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const { course, status } = useSelector(state => state.courseDetail);

  useEffect(() => {
    dispatch(getCourseDetailById(courseId));
  }, [courseId, dispatch]);

  useEffect(() => {
    if (status === 'completed') {
      showEditCourse(false);
    }
    if (status === 'error') {
      console.log('error occured');
    }
  }, [status, history]);

  const setPopupState = (value) => showEditCourse(value);

  const handleCourse = (values) => {
    console.log('course', course);
    const updatedCourse = {
      ...values,
      id: course.id,
      files: course.files,
    }
    callData(updatedCourse);
  }

  const closePopup = () => setDeletePopup(false);

  const handleDeleteCourse = async () => {
    closePopup();
    await dispatch(deleteCourseFromList(courseId));
    if (status === 'completed') { history.push('/'); }
  };

  const handleDeleteBtn = () => setDeletePopup(true);

  const handleUpload = (value) => {
    handlePopup.setShowPopup(value);
  }

  const handleUpdateFiles = (fileList) => {
    const updatedCourse = {
      ...course,
      ...course.files,
      files: [...course.files, ...fileList]
    }
    delete updatedCourse._id;
    //editCourse(updatedCourse);
    callData(updatedCourse)
  }

  const callData = (obj) => {
    dispatch(updateCourseInList(obj, courseId));
  }

  const handleBackBtn = () => history.push('/');

  const getFileList = (list) => {
    if (!list) {
      return [];
    }
    const data = list.map(item => {
      return {
        ...item,
        date: moment(item.lastModifiedDate).format('YYYY/MM/DD'),
        size: bytesToSize(item.size)
      }
    });
    return data;
  }

  return (
    <div className="courseDetail">
      <Spin spinning={status !== 'completed'}>
        {course ?
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
            <div><strong>Type: </strong>{course.type || ''}</div>
            <div><strong>Start Date: </strong> {course.date || ''} </div>
            <div><strong>Level: </strong> <Rate className='rate' value={parseInt(course.level) || 0} /></div>
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
        </Card>: null}
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