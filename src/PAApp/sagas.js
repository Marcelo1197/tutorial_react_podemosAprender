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

function* sesionRegistrarse(action) {
	yield put({ type: 'pa/SERVIDOR_ESPERANDO', datos: 'SESION' })

	const { datos, error } = yield call(promesaAdict_f(PaApi.apiLogin,'saga registrarse'), action.datos.participante, action.datos.clave);
	if (!error && datos && !datos.error) {
		yield put({ type: 'pa/SESION_CUANDO_TIENE', datos: {participante: PaApi.usuarioLeer() } });
	}
	else {
		yield put({ type: 'pa/SESION_CUANDO_NO_TIENE', error });
	}
}

export function* rootSaga() { //U: un solo punto de entrada para todas las "sagas"
	yield all([
		takeEvery('pa/SESION_REGISTRARSE', sesionRegistrarse),
	])
}

