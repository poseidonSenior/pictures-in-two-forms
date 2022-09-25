import { SET_DATA, ERROR, SET_SORT } from './actions'

const defaultState = {
    data: [],
    loading: false,
    error: undefined,
    sort: undefined,
}


export function dataReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_DATA:
            return { ...state, data: action.payload, loading: true };
        case SET_SORT:
            return { ...state, sort: action.payload };
        case ERROR:
            return { ...state, error: action.error, loading: true };
        default:
            return state;
    }
}
