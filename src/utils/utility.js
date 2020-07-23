import moment from 'moment';
import { SHOW_ALL, SEARCH_FILTER } from '../actions/actionTypes';

export const BASE_URL = 'https://courseservice.herokuapp.com/'; //'http://localhost:9000/';

export const getDate = (date) => {
  return moment(date).format("dddd, MMMM Do YYYY");
}

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

export const bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};