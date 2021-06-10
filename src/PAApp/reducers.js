//INFO: el estado de nuestra app y como cambia

import { logmsg } from '../services/util';
import { createSlice } from '@reduxjs/toolkit'

const EstadoInicial= { //U: como se vería el estado
	participante: null, //U: el username de la participante
	tieneTokenVigente: false, //U: si probamos el token y sabemos que está vigente
	esperandoServidorPA: 0, //U: cuantas respuestas del servidor estamos esperando 
	textos: {}, //U: id a texto
	charlas: {}, //U: dondeEstaMirandoId -> filtros -> cursor
};

//VER: https://redux-toolkit.js.org/api/createReducer
//VER: https://redux-toolkit.js.org/api/createReducer#usage-with-the-map-object-notation

const nop= (state) => state; //U: no cambia nada
const se_ocupa_saga= nop;

const AccionAReducer= { //U: los mensajes que recibe el store y como se reducen
	SERVIDOR_ESPERANDO: (state, datos) => { //U: avisamos que estamos esperando algo del servidor
		state.esperandoServidorPA++;
	},

	SESION_REVISAR: se_ocupa_saga,

	SESION_REGISTRARSE: se_ocupa_saga,

	SESION_CUANDO_TIENE: (state, { datos }) => {
		state.participante= datos.participante;
		state.tieneTokenVigente= true;
		state.esperandoServidorPA= state.esperandoServidorPA-1;
		logmsg('SESION_CUANDO_TIENE',datos, state.participante);
	},

	SESION_CUANDO_NO_TIENE: (state, datos) => {

		state.participante= datos.participante; //A: puede tener aunque no tenga sesion
		state.tieneTokenVigente= false;
		state.esperandoServidorPA= state.esperandoServidorPA-1;
	},
}

//VER: https://redux-toolkit.js.org/api/createSlice
export const slice= createSlice({
	name: 'pa',
	initialState: EstadoInicial,
	reducers: AccionAReducer,
})

export default slice.reducer;

