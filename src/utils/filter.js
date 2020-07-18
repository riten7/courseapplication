import { SHOW_ALL, SEARCH_FILTER } from '../actions/actionTypes';
export const getFilteredList = (courses, searchType, searchText) => {
    switch (searchType) {
      case SHOW_ALL:
        return courses;
      case SEARCH_FILTER:
        return courses.flat().filter(item => {
          let title = item.title.toLowerCase();
          return title.indexOf(searchText.toLowerCase()) > -1;
        });
      default:
        return courses;
    }
  }