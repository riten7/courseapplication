import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from '../actions/actionCreators';
import { Col, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const SearchFilter = () => {
  const [popupDisplay, setPopupDisplay] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.courseList);

  useEffect(() => {
    if (status === 'completed') {
      setPopupDisplay(false);
    }
  }, [status]);

  const handleInputChange = useCallback((e) => {
    dispatch(setSearchText(e.target.value));
  }, [dispatch]);

  const setPopupState = (value) => setPopupDisplay(value);

  return (
    <>
      <div className="search-form">
        <Col>
          <Input className="searchInput" type="text" placeholder="Search your course here..."
            onChange={handleInputChange} />
        </Col>
        <Col>
          <Button className="addCourseBtn" type="primary" onClick={setPopupState}><PlusOutlined /></Button>
          <p>Create Course </p>
        </Col>
      </div>
      {popupDisplay ? console.log(popupDisplay) : null}
    </>
  );
}

export default SearchFilter;