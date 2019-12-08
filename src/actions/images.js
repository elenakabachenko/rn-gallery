import {REQUEST_IMAGES, RECEIVE_IMAGES, FETCH_IMAGES_ERROR} from './types';

import {URL} from './types';

import {CLIENT_ID} from '../../config/application';
const ROOT_URL = `${URL}/?client_id=${CLIENT_ID}`;

export const fetchImages = (page = 1) => async dispatch => {
  try {
    dispatch({type: REQUEST_IMAGES});
    const data = await fetch(`${ROOT_URL}&page=${page}`).then(response =>
      response.json(),
    );
    dispatch({type: RECEIVE_IMAGES, payload: {data, meta: {page}}});
  } catch (e) {
    dispatch({type: FETCH_IMAGES_ERROR});
  }
};
