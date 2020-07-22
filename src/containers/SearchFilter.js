import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, addCourseToList } from '../actions/actionCreators';
import { Col, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddCourse from './AddCourse';

const SearchFilter = () => {
  const [addCourseVisible, showAddCourse] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.courseList);

  useEffect(() => {
    if (status === 'completed') {
      showAddCourse(false);
    }
  }, [status]);

  const handleInputChange = useCallback((e) => {
    dispatch(setSearchText(e.target.value));
  }, [dispatch]);

  const handleAddCourseBtn = (value) => showAddCourse(value);

  const handleCourse = (values) => {
    dispatch(addCourseToList(values));
  }

  return (
    <>
      <div className="search-form">
        <Col>
          <Input className="searchInput" type="text" placeholder="Search your course here..."
            onChange={handleInputChange} />
        </Col>
        <Col>
          <Button className="addCourseBtn" type="primary" onClick={handleAddCourseBtn}><PlusOutlined /></Button>
          <p>Create Course</p>
        </Col>
      </div>
      {addCourseVisible ?
        <AddCourse
          handleCourse={handleCourse}
          showAddCourse={showAddCourse} /> : null}
    </>
  );
}

export default SearchFilter;