export const SET_DATA = "SET_DATA"
export const SET_SORT = "SET_SORT"
export const FETCH_DATA = "FETCH_DATA"
export const ERROR = "ERROR"


export const setData = payload => ({ type: SET_DATA, payload })
export const setSort = payload => ({ type: SET_SORT, payload })
export const fetchData = () => ({ type: FETCH_DATA })
export const errorData = error => ({ type: ERROR, error })
