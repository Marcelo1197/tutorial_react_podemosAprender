//INFO: ejemplos de "sagas" y como usarlas

import { put, call, takeEvery, all } from 'redux-saga/effects'

export const delay = (ms) => new Promise(res => setTimeout(res, ms))
export function promesaAdict(unaPromesa) { //U: devuelve un dict con datos o error que podemos desestructurar
	return (
		unaPromesa
		.then(datos => ({ datos }))
		.catch(error => ({ error }))
	)
}

export function promesaAdict_f(unaFuncion) {
	return (() => promesaAdict( unaFuncion.apply(this, arguments)));
}

//S: lo mas simple, una saga es un generador (el asteriesco despues de function)
function* helloSaga() {
	console.log('Hello Sagas!')
}

//S: una saga que ejecuta una funcion async y DESPUES cambia el store
export function* incrementAsync() { //U: la saga que ejecuta
	console.log('incrementAsync');
	yield call(delay,2000);
	yield put({ type: 'INCREMENT' })
}

function* watchIncrementAsync() { //U: la que conecta la accion con como ejecutarla
	yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

//S: una consulta que puede dar bien o error
let emuCnt= 0; //U: para simular un error cada 3 por ej.
function simularFetchEnLaApi() {
	let quiereError= !(emuCnt++ % 3); //A: simular un error cada 3
	const miCnt= emuCnt;
	return new Promise( (siOk, siError) => setTimeout(() => (quiereError ? siError('error '+miCnt) : siOk('ok '+miCnt)),2000));
}

window.simularFetchEnLaApi= promesaAdict_f(simularFetchEnLaApi);

function* fetchProducts() {
	const { datos, error } = yield call(promesaAdict_f(simularFetchEnLaApi))
	console.log('fetchProducts', { datos, error });
	if (datos)
		yield put({ type: 'ejemplo/PRODUCTS_RECEIVED', products: datos })
	else
		yield put({ type: 'ejemplo/PRODUCTS_REQUEST_FAILED', error })
}

function* buscarProductosSaga() {
	yield takeEvery('ejemplo/BUSCAR_PRODUCTOS', fetchProducts)
}

export function* rootSaga() { //U: un solo punto de entrada para todas las "sagas"
	yield all([
		helloSaga(),
		watchIncrementAsync(),
		buscarProductosSaga(),
	])
}

