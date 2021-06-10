//INFO: ejemplos de "sagas" y como usarlas

import * as PaApi from '../services/pa-api'
import { logmsg } from '../services/util';
import { put, call, takeEvery, all } from 'redux-saga/effects'

//S: LIB *****************************************************
export const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function promesaAdict(unaPromesa, quiereLog) { //U: devuelve un dict con datos o error que podemos desestructurar
	const p= (
		unaPromesa
		.then(datos => ({ datos }))
		.catch(error => ({ error }))
	);

	return (
		quiereLog 
		? p.then(v => { logmsg(quiereLog+' R',v); return v})
		: p
	)
}

export function promesaAdict_f(unaFuncion, quiereLog) {
	return ((...args) => {
		quiereLog && logmsg(quiereLog+' C',args);
		return promesaAdict( unaFuncion.apply(this, args), quiereLog);
	})
}

//S: SESION ***************************************************
function* sesionRevisar(action) {
	yield put({ type: 'pa/SERVIDOR_ESPERANDO', datos: 'SESION' })

	let { datos, error } = yield call(promesaAdict_f(PaApi.apiNecesitoLoginP,'sesion revisar'));
	if (datos===false) { //A: no necesito login
		yield put({ type: 'pa/SESION_CUANDO_TIENE', datos: {participante: PaApi.usuarioLeer() } });
	}
	else {
		yield put({ type: 'pa/SESION_CUANDO_NO_TIENE', datos });
	}
}

function* sesionRegistrarse(action) {
	yield put({ type: 'pa/SERVIDOR_ESPERANDO', datos: 'SESION' })

	const { participante, clave }= action.datos;
	let { datos, error } = yield call(promesaAdict_f(PaApi.apiLogin), participante, clave);

	datos= datos || {}; datos.error= datos.error || error;

	if (!datos.error) {
		yield put({ type: 'pa/SESION_CUANDO_TIENE', datos: {participante: PaApi.usuarioLeer() } });
	}
	else {
		yield put({ type: 'pa/SESION_CUANDO_NO_TIENE', datos });
	}

}

//S: CONSULTA GENERICA (USAR ESPECIFICAS!) ********************
function* apiBuscar(action) {
	const { cursor_id, consulta, filtros }= action.datos;

	yield put({ type: 'pa/SERVIDOR_ESPERANDO', datos: 'BUSCAR/'+cursor_id })

	let { datos, error } = yield call(promesaAdict_f(PaApi.apiConsultar), consulta, filtros );
	if (PaApi.esErrorNecesitaLogin(error)) {
		yield put({ type: 'pa/SESION_CUANDO_NO_TIENE', datos: {}  })
	}

	datos= datos || {}; datos.error= datos.error || (error+'');
	datos.cursor_id= cursor_id;

	yield put({ type: 'pa/API_CUANDO_RECIBE', datos });
}

function* apiBuscarTextos(action) {
	const { cursor_id, filtros }= action.datos;
	logmsg('apiBuscarTextos',action);
	yield put({
		type:'pa/API_BUSCAR', 
		datos: { 
			cursor_id: cursor_id, 
			consulta: ['textoLista', 'id','texto','fhCreado',['deQuien','username'], 
				['pageInfo', 'endCursor', 'hasNextPage', 'startCursor','hasPreviousPage']
			], 
			filtros: {orderBy:['-fhCreado'], first: 3, ...filtros}
	}});
}

//S: conectar mensajes redux a sagas *************************
export function* rootSaga() { //U: un solo punto de entrada para todas las "sagas"
	yield all([
		takeEvery('pa/SESION_REVISAR', sesionRevisar),
		takeEvery('pa/SESION_REGISTRARSE', sesionRegistrarse),

		takeEvery('pa/API_BUSCAR', apiBuscar),
		takeEvery('pa/API_BUSCAR_TEXTOS', apiBuscarTextos),
	])
}

