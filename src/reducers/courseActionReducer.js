import { 
  FETCH_START, 
  FETCH_COURSE_DETAIL, 
  UPDATE_COURSE, 
  DELETE_COURSE 
} from '../actions/actionTypes';

const initialData = {
  status: 'default',
  movies: {}
};


const courseActionReducer = (state = initialData, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, status: 'loading' , isLoading: true};

    case FETCH_COURSE_DETAIL:
    case UPDATE_COURSE:
      return { ...state, status: 'completed', isLoading: false,  course: action.payload };
    
    case DELETE_COURSE:
      return { ...state, status: 'completed' };

    default:
      return state;
  }
}

export default courseActionReducer;