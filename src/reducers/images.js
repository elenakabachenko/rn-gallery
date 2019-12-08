import {
  REQUEST_IMAGES,
  RECEIVE_IMAGES,
  FETCH_IMAGES_ERROR,
} from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  isLoading: false,
  data: [],
  meta: {
    page: 1,
  },
  errors: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_IMAGES: {
      return {...state, isLoading: true};
    }
    case RECEIVE_IMAGES: {
      const {data, meta} = action.payload;
      return {
        ...state,
        data: _.uniqBy(state.data.slice().concat(data), 'id'),
        meta,
        isLoading: false,
      };
    }
    case FETCH_IMAGES_ERROR: {
      return {...state, isLoading: false};
    }
    default:
      return state;
  }
};
