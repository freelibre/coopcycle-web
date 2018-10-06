import { createAction } from 'redux-actions'

export const FETCH_REQUEST = 'FETCH_REQUEST'

export const fetchRequest = createAction(FETCH_REQUEST)

export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS'
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE'

export const addItemSuccess = createAction(ADD_ITEM_SUCCESS)
export const addItemFailure = createAction(ADD_ITEM_FAILURE)

export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS'
export const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE'

export const removeItemSuccess = createAction(REMOVE_ITEM_SUCCESS)
export const removeItemFailure = createAction(REMOVE_ITEM_FAILURE)

export function addItem(itemURL, quantity = 1) {

  return dispatch => {
    dispatch(fetchRequest())

    return $.post(itemURL, { quantity })
      .then(res => dispatch(addItemSuccess(res)))
      .fail(e => dispatch(addItemFailure(e.responseJSON)))
  }
}

export function removeItem(itemID) {

  return (dispatch, getState) => {

    const removeFromCartURL = getState().removeFromCartURL

    console.log('removeFromCartURL', removeFromCartURL)

    dispatch(fetchRequest())

    return $.ajax({
      url: removeFromCartURL.replace('__CART_ITEM_ID__', itemID),
      type: 'DELETE',
    })
    .then(res => dispatch(removeItemSuccess(res)))
    .fail(e => dispatch(removeItemFailure(e.responseJSON)))

    // if (shouldFetchPosts(getState(), subreddit)) {
    //   // Dispatch a thunk from thunk!
    //   return dispatch(fetchPosts(subreddit))
    // } else {
    //   // Let the calling code know there's nothing to wait for.
    //   return Promise.resolve()
    // }
  }

  // return function (dispatch) {
  //   dispatch(fetchRequest())

  //   return $.post(itemURL, { quantity })
  //     .then(res => dispatch(addItemSuccess(res)))
  //     .fail(e => dispatch(addItemFailure(e.responseJSON)))
  // }
}
