import React from 'react';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUrlSearchParams } from '../../hooks/useUrlSearchParams';
import { urlParamsParaDiccionario } from '../../services/pa-lib';
import { fechaLegible, fechasSonIguales, fechaParaTexto } from '../../services/pa-lib';
import { usePaApiConsulta } from '../../hooks/usePaApiConsulta';


import Marco from './Marco';

import MarkdownMostrar from '../../components/MarkdownMostrar';

import Typography from '@material-ui/core/Typography';

const CuantosTraerPorConsulta= 5;
export default function TextosLeer(props) {
	//TODO: convertir esto en libreria! copie de pages/Textos {
	const history= useHistory();

	const urlSearchParams= useUrlSearchParams(); //A: ej fh_max=2021-05-12
	const filtrosParaUrlParams= () => ({
			fhEditado_Lt: fechaParaTexto( urlSearchParams['fh_max'] ),
			charla_Titulo: urlSearchParams['charla'],
			deQuien_Username: urlSearchParams['de'],
	})

	const {datos, filtros, setFiltros, estado}= usePaApiConsulta(
		['textoLista', 
				'id','texto','fhCreado', ['deQuien','username'],
				['pageInfo', 'endCursor', 'hasNextPage', 'startCursor','hasPreviousPage']
		],
		{orderBy:['-fhCreado'], first: CuantosTraerPorConsulta, ...(filtrosParaUrlParams())},
	);
	const [indice, setIndice]= useState(0);

	useEffect(() => {
		const fechaMax= fechaParaTexto(urlSearchParams.fh_max);
		const idx= datos?.datos && datos.datos.findIndex(t => (t.fhCreado<fechaMax));	
		console.log('DBG cursor',fechaMax,idx,datos?.datos?.map(t => t.fhCreado));
		if (idx>-1) { setIndice(idx) }
		else { setFiltros({ ...filtros, ...(filtrosParaUrlParams())}); setIndice(0); };
	}, [urlSearchParams]); //A: repetir la consulta si cambia VALORES de query params 
	//TODO: convertir esto en libreria! copie de pages/Textos }

	const texto= datos?.datos && datos.datos[indice];
	const cuandoAccion= (queQuiere) => {
		if (queQuiere=='proximo') { 
			if (datos.pageInfo.hasNextPage) { 
				history.push({
					search: '?'+urlParamsParaDiccionario({ ...urlSearchParams, fh_max:texto.fhCreado})
				});
			}
			else {
				alert('No hay más después');
			}
		}
		else if (queQuiere=='anterior') { setIndice(Math.max(indice-1,0)) }
		else { props.cuandoAccion(queQuiere); }
	};


	return (
		<Marco {...props} cuandoAccion={cuandoAccion}>
			{ texto 
				? (<>
					{texto.id}
					<MarkdownMostrar contexto={texto}>
						{texto.texto}
					</MarkdownMostrar>
					</>
					)
				: ('Estado '+estado)
			}
		</Marco>
	);
}
