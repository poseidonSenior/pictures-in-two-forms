import { put, takeEvery, call } from "redux-saga/effects";
import { setData, FETCH_DATA, errorData } from '../actions';

const fetchDataFromApi = () => fetch('http://contest.elecard.ru/frontend_data/catalog.json');

//TODO: С помощью этой функции можно имитировать время загрузки данных для отображения процесса загрузки.
// const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* getData() {
    try {
        // yield delay(5000)
        const data = yield call(fetchDataFromApi)
        const json = yield call(() => new Promise(res => res(data.json())))
        yield put(setData(json))
    }
    catch (error) {
        yield put(errorData(error))
    }
}

export function* getDataSaga() {
    yield takeEvery(FETCH_DATA, getData)
}