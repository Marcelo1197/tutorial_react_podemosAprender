import { createSlice } from '@reduxjs/toolkit'

const estadoInicial= {
	num: 0, 
	productos: {estado: 'ok', error: null, datos: []}
};

//VER: https://redux-toolkit.js.org/api/createReducer
//VER: https://redux-toolkit.js.org/api/createReducer#usage-with-the-map-object-notation
const actionXreducer= {
	'INCREMENT': (state,action) => {state.num++},
	'DECREMENT': (state,action) => {state.num--},
	'BUSCAR_PRODUCTOS': (state,action) => {
		state.productos.estado= 'buscando'
		state.productos.error= null
	},
	'PRODUCTS_REQUEST_FAILED': (state,action) => {
		state.productos.estado= 'error'
		state.productos.error= action.error
	},
	'PRODUCTS_RECEIVED': (state,action) => {
		state.productos.estado= 'ok'
		state.productos.error= null
		state.productos.datos.push(action.products);
	},
}

//VER: https://redux-toolkit.js.org/api/createSlice
export const slice= createSlice({
	name: 'ejemplo',
	initialState: estadoInicial,
	reducers: actionXreducer,
})

export default slice.reducer;
