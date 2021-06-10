//INFO: ejemplos de "sagas" y como usarlas

import * as PaApi from '../services/pa-api'
import { get_p, logmsg } from '../services/util';
import { put, call, select, takeEvery, all } from 'redux-saga/effects'

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
	const { cursor_id, relativo, consulta, filtros }= action.datos;

	yield put({ type: 'pa/SERVIDOR_ESPERANDO', datos: 'BUSCAR/'+cursor_id })

	if (relativo) {
		const cursor= yield select(s => get_p(s,'{pa{cursores{'+cursor_id));
		if (cursor) {
			const idx_nuevo= cursor.datos.idx + relativo;
			logmsg('apiBuscar',{relativo, idx_nuevo});
			if (idx_nuevo<0) {
				filtros.before= cursor.pageInfo.startCursor;
			}
			else if (idx_nuevo > cursor.datos.items.length-1) {
				filtros.after= cursor.pageInfo.endCursor;
			}
			else {
				const datos= { ...cursor,
					datos: { ...cursor.datos,
						idx: idx_nuevo,
						actual: cursor.datos.items[ idx_nuevo ],
					}
				};
				yield put({ type: 'pa/API_CUANDO_RECIBE', datos });
				return;
			}
		}
	}

	let { datos, error } = yield call(promesaAdict_f(PaApi.apiConsultar), consulta, filtros );
	if (PaApi.esErrorNecesitaLogin(error)) {
		yield put({ type: 'pa/SESION_CUANDO_NO_TIENE', datos: {}  })
	}

	datos= datos || {}; datos.error= datos.error || (error+'');
	datos.cursor_id= cursor_id;
	if (datos.datos) {
		const d= {};
		d.idx= filtros.before ? (datos.datos.length + relativo): 0; //A: si pidio "-1" o sea antes, le muestro el ultimo
		d.actual= datos.datos[d.idx];
		d.items= datos.datos;
		datos.datos= d;
	}
	yield put({ type: 'pa/API_CUANDO_RECIBE', datos });
}

function* apiBuscarTextos(action) {
	const { cursor_id, filtros, relativo }= action.datos;
	logmsg('apiBuscarTextos',action);
	yield put({
		type:'pa/API_BUSCAR', 
		datos: { 
			cursor_id, 
			relativo,
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

