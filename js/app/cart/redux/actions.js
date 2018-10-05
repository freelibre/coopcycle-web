import { createAction } from 'redux-actions'

export const FETCH_REQUEST = 'FETCH_REQUEST'

export const fetchRequest = createAction(FETCH_REQUEST)

export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS'
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE'

export const addItemSuccess = createAction(ADD_ITEM_SUCCESS)
export const addItemFailure = createAction(ADD_ITEM_FAILURE)

export function addItem(itemURL, quantity = 1) {

  return function (dispatch) {
    dispatch(fetchRequest())

    return $.post(itemURL, { quantity })
      .then(res => dispatch(addItemSuccess(res)))
      .fail(e => dispatch(addItemFailure(e.responseJSON)))
  }
}

export function removeItem(itemID) {

  // return function (dispatch) {
  //   dispatch(fetchRequest())

  //   return $.post(itemURL, { quantity })
  //     .then(res => dispatch(addItemSuccess(res)))
  //     .fail(e => dispatch(addItemFailure(e.responseJSON)))
  // }
}
