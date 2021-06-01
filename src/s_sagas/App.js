import React from 'react'
import { useSelector } from 'react-redux'

import { Provider } from 'react-redux'

import { createStore, applyMiddleware, compose } from 'redux'
import Immutable from 'immutable';
import createSagaMiddleware from 'redux-saga'

import Counter from './Counter'
import reducer from './reducers'

import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()

//VER: https://github.com/zalmoxisus/redux-devtools-extension#usage
//VER: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
const DevToolsOpts= {}; //{ serialize: { immutable: Immutable } }//A: Para usar immutable
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(DevToolsOpts) 
	: compose;

const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
	applyMiddleware(sagaMiddleware),
))
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

function Contenido() {
	const state= useSelector( state => state );
	return  (<div>
		<Counter
				value={state.num}
				onIncrement={() => action('INCREMENT')}
				onIncrementAsync={() => action('INCREMENT_ASYNC')}
				onDecrement={() => action('DECREMENT')} />

		<div>
			<button onClick={() => action('BUSCAR_PRODUCTOS')}>Buscar productos</button>
		</div>
		<pre>
			{JSON.stringify(state,null,2)}
		</pre>
	</div>)
}

export default function App() {
	return (
		<Provider store={store}>
			<Contenido />
		</Provider>
	)
}

