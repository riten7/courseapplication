import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './course.css';
import '../../components/Button/Button.css';
import { Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import CourseFilter from './CourseFilter';
import CourseListItem from './CourseListItem';
import ErrorMessage from '../../components/Message/ErrorMessage';
import PopupModal from '../../components/Modal/PopupModal';
import CourseForm from '../../components/Form/CourseForm';
import Button from '../../components/Button/Button'

import { getFilteredList } from '../../utils/utility';
import { fetchCourseList, clearCourseList } from '../../actions/actionCreators';
import { coursetypes, courselevels } from './courseContant';


const CourseList = () => {
  const [showCourseModal, setShowCourseModal] = useState(false);
  const dispatch = useDispatch();
  const { courses, status } = useSelector(state => state.courseList);
  const { type, text } = useSelector(state => state.searchBy);
  const courseList = getFilteredList(courses, type, text);

  useEffect(() => {
    dispatch(fetchCourseList());
    return () => {
      dispatch(clearCourseList());
    }
  }, [dispatch]);

  useEffect(() => {
    if (status === 'completed') {
      setShowCourseModal(false);
    }
  }, [status]);

  const handleSubmit = (values) => {
    values.date = values.date.format('YYYY/MM/DD');
    console.log(values);
    setShowCourseModal(false);
    //dispatch(addCourseToList(values));
  }

  return (
    <>
      <div className="searchCourse">
        <CourseFilter />
        <Button
          className="addCourseBtn"
          type="primary"
          buttonText={<PlusOutlined />}
          onButtonClick={() => setShowCourseModal(true)}>
        </Button>
        <p>Create Course</p>
      </div>
      <div className="courseModal">
        <PopupModal
          showModal={showCourseModal}
          title={'Add Course'}
          closeModal={() => setShowCourseModal(false)}
        >
          <CourseForm
            courseTypes={coursetypes}
            courseLevels={courselevels}
            handleSubmit={handleSubmit} />
        </PopupModal>
      </div>
      <Spin className="spinner" spinning={status === 'loading'}>
        {courseList && courseList.length &&
          <CourseListItem
            courseList={courseList}
          />
        }
        {status === 'error' && <ErrorMessage title="Something went wrong. Please try again later!" />}
      </Spin>
    </>
  )
}

export default CourseList;