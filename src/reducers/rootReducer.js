import { combineReducers } from 'redux';
import courseList from './courseListReducer';
import searchBy from './searchReducer';

export default combineReducers({
  courseList,
  searchBy
});