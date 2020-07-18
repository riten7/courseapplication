import { FETCH_START, FETCH_COURSES, CLEAR_COURSES, COURSES_ERROR } from '../actions/actionTypes';

const initialData = {
  status: 'default',
  courses: {}
};

const courseListReducer = (state = initialData, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, status: 'loading' };

    case FETCH_COURSES:
      return { ...state, status: 'completed', courses: action.payload };
    
    case COURSES_ERROR:
      return { ...state, status: 'error'}

    case CLEAR_COURSES:
    default:
      return state;
  }
}

export default courseListReducer;