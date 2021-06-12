//INFO: crear un store redux con sagas


import { configureStore, isPlain } from '@reduxjs/toolkit'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import { rootSaga } from './sagas'

const SagaMiddleware = createSagaMiddleware()

//VER: https://redux-toolkit.js.org/api/serializabilityMiddleware
const isSerializable = (value) => (value instanceof Date) || isPlain(value);

const RootReducer= {
		pa: reducer,
}

const store= configureStore({
	reducer: RootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: {
			isSerializable //A: no poner warning por fechas
		},
	}).concat(SagaMiddleware), //A: usamos sagas para ejecutar acciones
	devTools: import.meta.env.NODE_ENV !== 'production',
})

SagaMiddleware.run(rootSaga)

export default store;
