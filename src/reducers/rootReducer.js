import { combineReducers } from 'redux';
import courseList from './courseListReducer';
import searchBy from './searchReducer';
import courseDetail from './courseActionReducer';

export default combineReducers({
  courseList,
  searchBy,
  courseDetail,
});