import { SEARCH_FILTER, SHOW_ALL } from '../actions/actionTypes';
const searchReducer = (initialFilter = {
  type: SHOW_ALL,
  text: ''
}, action) => {
  switch (action.type) {
    case SEARCH_FILTER:
      return {
        type: action.type,
        text: action.payload.searchtext
      }
    default:
      return initialFilter;
  }
}

export default searchReducer;