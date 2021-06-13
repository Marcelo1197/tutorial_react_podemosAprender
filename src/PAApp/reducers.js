//INFO: el estado de nuestra app y como cambia

//TODO: ver si queremos persistir con VER: https://github.com/rt2zz/redux-persist

import { logmsg } from '../services/util';
import { createSlice } from '@reduxjs/toolkit'

const EstadoInicial= { //U: como se vería el estado
	participante: null, //U: el username de la participante
	tieneTokenVigente: false, //U: si probamos el token y sabemos que está vigente
	esperandoServidorPA: 0, //U: cuantas respuestas del servidor estamos esperando 
	cfg_ui: { 
		tema_id: '',
	},
	textos: {}, //U: id a texto
	cursores: {}, //U: dondeEstaMirandoId -> filtros -> cursor
};

try { EstadoInicial.cfg_ui= JSON.parse(localStorage.cfg_ui) }
catch (ex) {} //A:IGNORADA

//VER: https://redux-toolkit.js.org/api/createReducer
//VER: https://redux-toolkit.js.org/api/createReducer#usage-with-the-map-object-notation

const nop= (state) => state; //U: no cambia nada
const se_ocupa_saga= nop;

const AccionAReducer= { //U: los mensajes que recibe el store y como se reducen
	SERVIDOR_ESPERANDO: (state, datos) => { //U: avisamos que estamos esperando algo del servidor
		state.esperandoServidorPA++;
	},

	//S: SESION *****************************************************
	SESION_REVISAR: se_ocupa_saga,

	SESION_REGISTRARSE: se_ocupa_saga,

	SESION_CUANDO_TIENE: (state, { datos }) => {
		state.participante= datos.participante;
		state.tieneTokenVigente= true;

		state.esperandoServidorPA= state.esperandoServidorPA-1;
		//DBG: logmsg('SESION_CUANDO_TIENE',datos, state.participante);
	},

	SESION_CUANDO_NO_TIENE: (state, { datos }) => {
		state.participante= datos.participante; //A: puede tener aunque no tenga sesion
		state.tieneTokenVigente= false;

		state.esperandoServidorPA= state.esperandoServidorPA-1;
	},

	//S: CONSULTA GENERICA (USAR ESPECIFICAS!) **********************
	API_CUANDO_RECIBE: (state, { datos }) => {
		state.esperandoServidorPA= state.esperandoServidorPA-1;

		state.cursores[datos.cursor_id]= datos;
	},

	API_BUSCAR: se_ocupa_saga, //U: empezar una consulta
	API_BUSCAR_ANTES: se_ocupa_saga, //U: anteriores a los que trajo segun orderBy
	API_BUSCAR_DESPUES: se_ocupa_saga, //U: posteriores a los que trajo segun orderBy

	API_BUSCAR_TEXTOS: se_ocupa_saga, 

	//S: CFG UI *****************************************************
	CFG_UI_TEMA: (state, { datos }) => {
		state.cfg_ui.tema_id= datos.tema_id;
		localStorage.cfg_ui= JSON.stringify(state.cfg_ui);
	},
}

//VER: https://redux-toolkit.js.org/api/createSlice
export const slice= createSlice({
	name: 'pa',
	initialState: EstadoInicial,
	reducers: AccionAReducer,
})

export default slice.reducer;

/* TODO: MOVER A TEST

m= {type:'pa/API_BUSCAR', datos: { cursor_id: 'quehago', consulta: ['textoLista', 'id','texto','fhCreado',['deQuien','username'], ['pageInfo', 'endCursor', 'hasNextPage', 'startCursor','hasPreviousPage']
], filtros: {orderBy:['-fhCreado'], first: 3}}}

*/
