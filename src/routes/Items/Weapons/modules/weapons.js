import {Config} from "../../../../config";

// Sorting actions
const CHANGE_PAGE = 'CHANGE_PAGE';
const CHANGE_PER_PAGE = 'CHANGE_PER_PAGE';
const CHANGE_TOTAL = 'CHANGE_TOTAL';

// API calls actions
const REQUEST_WEAPONS = 'REQUEST_WEAPONS';
const RECEIVE_WEAPONS = 'RECEIVE_WEAPONS';

// Action builders
export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page
  }
}

export function changePerPage(perPage) {
  return {
    type: CHANGE_PER_PAGE,
    perPage
  }
}

export function changeTotal(total) {
  return {
    type: CHANGE_TOTAL,
    total
  }
}

export function requestWeapons() {
  return {
    type: REQUEST_WEAPONS
  }
}

export function receiveWeapons(items) {
  return {
    type: RECEIVE_WEAPONS,
    items
  }
}

// Thunk (necessary for API fetch)
export function fetchWeapons() {
  return (dispatch, getState) => {
    let localState = getState().itemsWeapons;

    dispatch(requestWeapons())

    fetch(`${Config.apiEndpoint}/item_weapon?page=${localState.page}&perPage=${localState.perPage}`)
      .then(response => response.json())
      .then(json => {
        // Validates headers
        if (localState.page != json.headers.page)
          dispatch(changePage(json.headers.page))
        if (localState.perPage != json.headers.perPage)
          dispatch(changePerPage(json.headers.perPage))
        if (localState.total != json.headers.total)
          dispatch(changeTotal(json.headers.total))

        // Updates items
        dispatch(receiveWeapons(json.data))
      })
  }
}

// Associates actions to default reducer
const ACTION_HANDLERS = {
  [CHANGE_PAGE]: (state, action) => Object.assign({}, state, { page: action.page }),
  [CHANGE_PER_PAGE]: (state, action) => Object.assign({}, state, { perPage: action.perPage }),
  [CHANGE_TOTAL]: (state, action) => Object.assign({}, state, { total: action.total }),
  [REQUEST_WEAPONS]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [RECEIVE_WEAPONS]: (state, action) => Object.assign({}, state, { isFetching: false, items: action.items })
}

// Initial state
const initialState = {
  isFetching: false,
  page: 1,
  perPage: 10,
  total: 0,
  items: []
}

// Default reducer
export default function weaponsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
