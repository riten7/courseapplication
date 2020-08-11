import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchText } from '../../actions/actionCreators';
import { Input } from 'antd';
import './courseSearch.css';

const CourseFilter = () => {
  const dispatch = useDispatch();

  const handleInputChange = useCallback((e) => {
    dispatch(setSearchText(e.target.value));
  }, [dispatch]);

  return (
          <Input className="searchInput" type="text" placeholder="Search your course here..."
            onChange={handleInputChange} />
  );
}

export default CourseFilter;