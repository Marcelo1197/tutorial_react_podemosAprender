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
		{orderBy:['-fhCreado'], first: 3, ...(filtrosParaUrlParams())},
	);

	useEffect(() => {
		setFiltros({ ...filtros, ...(filtrosParaUrlParams())});
	}, [urlSearchParams]); //A: repetir la consulta si cambia VALORES de query params 
	//TODO: convertir esto en libreria! copie de pages/Textos }

	const [indice, setIndice]= useState(0);
	const texto= datos?.datos && datos.datos[indice];
	const cuandoAccion= (queQuiere) => {
		if (queQuiere=='proximo') { 
			if (indice+1<datos.datos.length) { setIndice(indice+1); }
			else if (datos.pageInfo.hasNextPage) { setIndice(0);
				setFiltros({...filtros, after: datos.pageInfo.endCursor});	
			}
			else {
				alert('No hay más después');
			}
		}
		else if (queQuiere=='anterior') { setIndice(indice-1) }
		else { props.cuandoAccion(queQuiere); }
	};

	window.X= setIndice;
	window.Xd= datos;

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



