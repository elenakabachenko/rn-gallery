import {
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILED,
  FETCH_ITEMS_IS_LOADING,
  FETCHING_FROM_SERVER,
  INSTALL_OFFSET,
} from './types';


export function fetchItemsFailed(isFail) {
  return {
    type: FETCH_ITEMS_FAILED,
    isFailed: isFail,
  };
}

export function fetchingItemsFromServer(isFetching) {
  return {
    type: FETCHING_FROM_SERVER,
    isFetching: isFetching,
  };
}

export function itemsIsLoading(isLoading) {
  return {
    type: FETCH_ITEMS_IS_LOADING,
    isLoading: isLoading,
  };
}

export function installOffset(offset) {
  return {
    type: INSTALL_OFFSET,
    offset: offset,
  };
}

export function fetchItemsSuccess(items) {
  return {
    type: FETCH_ITEMS_SUCCESS,
    items: items,
  };
}

export function itemsFetchData(url) {
  return dispatch => {
    dispatch(itemsIsLoading(true));

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(fetchItemsFailed(false));

        return response;
      })
      .then(response => response.json())
      .then(items => dispatch(fetchItemsSuccess(items)))
      .catch(() => dispatch(fetchItemsFailed(true)));
  };
}
