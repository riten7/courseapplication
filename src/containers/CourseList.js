import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Spin } from 'antd';
import { fetchCourseList, clearCourseList } from '../actions/actionCreators';
import SearchFilter from './SearchFilter';
import CourseListItem from './CourseListItem';
import { getFilteredList } from './../utils/filter';
import { FileSearchOutlined } from '@ant-design/icons';
import ErrorMessage from './ErrorMessage';

const CourseList = () => {
  const dispatch = useDispatch();
  const { courses, status } = useSelector(state => state.courseList);
  const { type, text } = useSelector(state => state.searchBy);
  const courseList = getFilteredList(courses, type, text);

  React.useEffect(() => {
    dispatch(fetchCourseList());
    return () => {
      dispatch(clearCourseList());
    }
  }, [dispatch]);

  return (
    <>
      <Row className="courseSearch">
        <SearchFilter />
      </Row>
      <Spin className="spinner" spinning={status === 'loading'}>
        {status === 'completed' &&
          <Row className="courseList">
            {courseList && courseList.length > 0 ? courseList.map(item => (
              <CourseListItem key={item._id} course={item} />
            )) : <div className="noCourseFound"><FileSearchOutlined /><p>No Course Found</p></div>}
          </Row>
          // : <Spin size="large" />
        }
        {status === 'error' && <ErrorMessage title="Something went wrong. Please try again later!"/>}
      </Spin>
    </>
  )
}

export default CourseList;