/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import './detail.css';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Spin } from 'antd';

import PopupModal from '../../../components/Modal/PopupModal';
import CourseForm from '../../../components/Form/CourseForm';
import ConfirmationModal from '../../../components/Modal/ConfirmationModal';
import Button from '../../../components/Button/Button';

import FileDropZone from '../../../components/Files/FileDropZone';
import ErrorMessage from '../../../components/Message/ErrorMessage';

import {
  getCourseDetailById,
  updateCourseInList,
  updateCourseFilesInList,
  deleteCourseFromList
} from '../../../actions/actionCreators';
import { coursetypes, courselevels } from '../courseContant';
import CourseInfo from './CourseInfo';
import CourseFiles from './CourseFiles';

const CourseDetail = (props) => {
  const courseId = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const [showEditmodal, setShowEditModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFileUpload, setShowFileUpload] = React.useState(false);
  const { course, status } = useSelector(state => state.courseDetail);


  useEffect(() => {
    dispatch(getCourseDetailById(courseId));
  }, [courseId, dispatch]);

  useEffect(() => {
    if (status === 'completed') {
      setShowEditModal(false);
    }
    if (status === 'delete_completed') {
      history.push('/');
    }
  }, [status, history]);

  const handleCourse = (values) => {
    const updatedCourse = {
      ...values,
      id: course.id,
      files: course.files,
    }
    dispatch(updateCourseInList(updatedCourse, courseId));
  }

  const handleDeleteCourse = () => {
    setShowConfirmation(false);
    dispatch(deleteCourseFromList(courseId));
  };

  const fileUploadHandler = (fileList) => {
    const updatedCourse = {
      ...course,
      updatedFiles: fileList,
    }
    setShowFileUpload(false);
    dispatch(updateCourseFilesInList(updatedCourse, courseId));
  }

  // const handleDeleteFile = (file) => {
  //   const updatedCourse = {
  //     ...course,
  //     files: course.files.filter(item => item.id !== file.id),
  //   };
  //   delete updatedCourse._id;
  //   dispatch(updateCourseInList(updatedCourse, courseId));
  // }

  return (
    <div className="courseDetail">
      <PopupModal
        showModal={showEditmodal}
        title={'Edit Course'}
        closeModal={() => setShowEditModal(false)}
      >
        <CourseForm
          course={course}
          courseTypes={coursetypes}
          courseLevels={courselevels}
          handleSubmit={handleCourse} />
      </PopupModal>

      <ConfirmationModal
        show={showConfirmation}
        title={course.name}
        handleClose={() => setShowConfirmation(false)}
        handleConfirm={handleDeleteCourse} />

      <FileDropZone 
        show={showFileUpload}
        onCancel={() => setShowFileUpload(false)}
        fileUploadHandler={fileUploadHandler}/>

      <Spin className="spinner" spinning={status === 'loading'}>
        {status === 'completed' &&
          <Card>
            <h1>Course Information</h1>
            <CourseInfo course={course} />
            <div className="course__Actions">
              <Button buttonText='Edit Info' onButtonClick={() => setShowEditModal(true)} />
              <Button buttonText='Delete Course' onButtonClick={() => setShowConfirmation(true)} />
              <Button buttonText='Add Files' onButtonClick={() => setShowFileUpload(true)}/>
              <Button buttonText='Go Home' onButtonClick={() => history.push('/')} />
            </div>

            <hr />

            <CourseFiles course={course} />

          </Card>}
        {status === 'error' && <ErrorMessage title="Something went wrong. Please try again later!" />}
      </Spin>
    </div>
  )
}

export default CourseDetail;