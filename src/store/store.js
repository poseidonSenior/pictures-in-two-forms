import { applyMiddleware, createStore } from "redux";
import { dataReducer } from './state';
import createSagaMiddleware from 'redux-saga';
import { getDataSaga } from './saga/getData.saga';

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(dataReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(getDataSaga)