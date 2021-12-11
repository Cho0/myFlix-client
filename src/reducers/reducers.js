import { combineReducers } from 'redux';
import { ADD_MOVIE, SET_FILTER, SET_MOVIES } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function addMovie(state = [], action) {
  switch (action.type) {
    case ADD_MOVIE:
      return action.valuel;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  addMovie
});

export default moviesApp;