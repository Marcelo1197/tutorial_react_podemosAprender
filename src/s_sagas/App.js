import React from 'react'

import { Provider } from 'react-redux'
import { useSelector } from 'react-redux'

import store from './store'
import Counter from './Counter'

const action = type => store.dispatch({type})

function Contenido() {
	const state= useSelector( state => state );
	return  (<div>
		<Counter
				value={state.ejemplo.num}
				onIncrement={() => action('ejemplo/INCREMENT')}
				onIncrementAsync={() => action('ejemplo/INCREMENT_ASYNC')}
				onDecrement={() => action('ejemplo/DECREMENT')} />
		<div>
			<button onClick={() => action('ejemplo/BUSCAR_PRODUCTOS')}>Buscar productos</button>
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

