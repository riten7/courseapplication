import axios from 'axios';
import { 
  FETCH_START, 
  FETCH_COURSES, 
  CLEAR_COURSES, 
  SEARCH_FILTER, 
  COURSES_ERROR,
  ADD_COURSE,
  FETCH_COURSE_DETAIL,
  UPDATE_COURSE,
  DELETE_COURSE,
} from './actionTypes';
import { BASE_URL } from '../utils/utility';

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

export const addCourseToList = (data) => {
  return async dispatch => {
    dispatch({ type: FETCH_START });
    try {
      const response = await axios.post(BASE_URL + "insertCourse", data);
      dispatch({ type: ADD_COURSE, payload: response.data })
    } catch {
      dispatch({ type: COURSES_ERROR });
    }
  }
}

export const getCourseDetailById = (id) => {
  return async dispatch => {
    dispatch({ type: FETCH_START });
    try {
      const response = await axios.get(BASE_URL + "getCourse/" + id);
      dispatch({ type: FETCH_COURSE_DETAIL, payload: response.data });
    } catch {
      dispatch({ type: COURSES_ERROR });
    }
  }
}

export const updateCourseInList = (data, id) => {
  return async dispatch => {
    dispatch({ type: FETCH_START });
    try {
      const response = await axios.put(BASE_URL + "updateCourse/" + id, data);
      dispatch({ type: UPDATE_COURSE, payload: response.data });
    } catch {
      dispatch({ type: COURSES_ERROR })
    }
  }
}

export const updateCourseFilesInList = (data, id) => {
  return async dispatch => {
    dispatch({ type: FETCH_START });
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append("author", data.author);
      formData.append("date", data.date);
      formData.append("description", data.description)
      formData.append("level", data.level)
      formData.append("type", data.type);
      formData.append("fileList", JSON.stringify(data.files));
      data.updatedFiles.forEach((file) => {
       formData.append('file', file.originFileObj);
      });
      const response = await axios.put(BASE_URL + "updateCourseFiles/" + id, formData);
      dispatch({ type: UPDATE_COURSE, payload: response.data });
    } catch {
      dispatch({ type: COURSES_ERROR })
    }
  }
}

export const deleteCourseFromList = (id) => {
  return async dispatch => {
    dispatch({ type: FETCH_START });
    try {
      await axios.delete(BASE_URL + "deleteCourse/" + id);
      dispatch({ type: DELETE_COURSE });
    } catch {
      dispatch({ type: COURSES_ERROR })
    }
  }
}

// export const deleteFileFromCourse = (courseId, fileId) => {
//   return async dispatch => {
//     dispatch({ type: FETCH_START });
//     try {
//       await axios.delete(BASE_URL + "deleteFile/" + courseId + "/" + fileId);
//       //dispatch({ type: DELETE_COURSE });
//     } catch {
//       dispatch({ type: COURSES_ERROR })
//     }
//   }
// }