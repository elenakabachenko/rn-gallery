import {
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILED,
  FETCH_ITEMS_IS_LOADING,
  FETCHING_FROM_SERVER,
  INSTALL_OFFSET,
} from '../actions/types';

const INITIAL_STATE = {
  isFailed: false,
  isLoading: false,
  isFetching: false,
  offset:1,
  items: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ITEMS_FAILED:
      return {
        ...state,
        isFailed: action.isFailed,
      };
    case FETCH_ITEMS_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case FETCH_ITEMS_SUCCESS:
      const newItems = state.items.slice().concat(action.items);
      return {
        ...state,
        items: newItems,
      };
    case FETCHING_FROM_SERVER:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case INSTALL_OFFSET:
      return {
        ...state,
        offset: action.offset + 1,
      };
    default:
      return state;
  }
};
