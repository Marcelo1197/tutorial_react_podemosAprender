//INFO: crear un store redux con sagas
import { configureStore } from '@reduxjs/toolkit'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import { rootSaga } from './sagas'

const SagaMiddleware = createSagaMiddleware()

const store= configureStore({
	reducer: {
		pa: reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(SagaMiddleware),
	devTools: import.meta.env.NODE_ENV !== 'production',
})

SagaMiddleware.run(rootSaga)

export default store;
