import React from 'react'
import { useSelector } from 'react-redux'

import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './Counter'
import reducer from './reducers'

import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
	reducer,
	applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

function Contenido() {
	const state= useSelector( state => state );
	return  (
		<Counter
				value={state}
				onIncrement={() => action('INCREMENT')}
				onIncrementAsync={() => action('INCREMENT_ASYNC')}
				onDecrement={() => action('DECREMENT')} />
	)
}

export default function App() {
	return (
		<Provider store={store}>
			<Contenido />
		</Provider>
	)
}

