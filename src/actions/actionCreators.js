import axios from 'axios';
import { FETCH_START, FETCH_COURSES, CLEAR_COURSES, SEARCH_FILTER, COURSES_ERROR } from './actionTypes';
import { BASE_URL } from './Constant';

export const clearCourseList = () => ({
  type: CLEAR_COURSES
});

export const setSearchText = (searchtext) => ({
  type: SEARCH_FILTER,
  payload: { searchtext }
});

export const fetchCourseList = () => {
  return async dispatch => {
    dispatch({ type: FETCH_START });
    try {
      const response = await axios.get(BASE_URL + 'getAllCourses');
      dispatch({ type: FETCH_COURSES, payload: response.data });
    } catch {
      dispatch({ type: COURSES_ERROR });
    }
  };
};