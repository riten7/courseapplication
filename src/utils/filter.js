import { SHOW_ALL, SEARCH_FILTER } from '../actions/actionTypes';
export const getFilteredList = (courses, searchType, searchText) => {
    switch (searchType) {
      case SHOW_ALL:
        return courses;
      case SEARCH_FILTER:
        return courses.flat().filter(item => {
          let name = item.name.toLowerCase();
          return name.indexOf(searchText.toLowerCase()) > -1;
        });
      default:
        return courses;
    }
}

export const checkForDuplicates = (array, keyName) => {
  return new Set(array.map(item => item[keyName])).size !== array.length
}