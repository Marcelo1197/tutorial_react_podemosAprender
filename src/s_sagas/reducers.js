import { createReducer } from '@reduxjs/toolkit'

const estadoInicial= {
	num: 0, 
	productos: {estado: 'ok', error: null, datos: []}
};

const reducer= createReducer(estadoInicial, (builder) => {
	builder
    .addCase('INCREMENT', (state,action) => {state.num++})
    .addCase('DECREMENT', (state,action) => {state.num--})
		.addCase('BUSCAR_PRODUCTOS', (state,action) => {
			state.productos.estado= 'buscando'
			state.productos.error= null
		})
		.addCase('PRODUCTS_REQUEST_FAILED', (state,action) => {
			state.productos.estado= 'error'
			state.productos.error= action.error
		})
		.addCase('PRODUCTS_RECEIVED', (state,action) => {
			state.productos.estado= 'ok'
			state.productos.error= null
			state.productos.datos.push(action.products);
		})
   	.addDefaultCase((state,action) => {}) 
  }
)

export default reducer;
