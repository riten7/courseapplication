import { 
  FETCH_START, 
  FETCH_COURSE_DETAIL, 
  UPDATE_COURSE, 
  DELETE_COURSE ,
  COURSES_ERROR
} from '../actions/actionTypes';

const initialData = {
  status: 'default',
  course: {}
};


const courseActionReducer = (state = initialData, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, status: 'loading' , isLoading: true};

    case FETCH_COURSE_DETAIL:
    case UPDATE_COURSE:
      return { ...state, status: 'completed', isLoading: false,  course: action.payload };
    
    case DELETE_COURSE:
      return { ...state, status: 'delete_completed' };
    
    case COURSES_ERROR:
      return { ...state, status: 'error', isLoading: false}

    default:
      return state;
  }
}

export default courseActionReducer;