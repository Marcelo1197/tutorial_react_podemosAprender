//INFO: crear un store redux con sagas
import { configureStore } from '@reduxjs/toolkit'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas'

import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware()

/*
//VER: https://github.com/zalmoxisus/redux-devtools-extension#usage
//VER: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
const DevToolsOpts= {}; //{ serialize: { immutable: Immutable } }//A: Para usar immutable
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(DevToolsOpts) 
	: compose;

const store = createStore(
	reducer, composeEnhancers(
	applyMiddleware(sagaMiddleware),
))
*/

const store= configureStore({
	reducer: {
		ejemplo: reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
	devTools: import.meta.env.NODE_ENV !== 'production',
})
sagaMiddleware.run(rootSaga)

export default store;
