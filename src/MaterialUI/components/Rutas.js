import React from 'react';
import { Switch } from "react-router-dom";

import { RutaConLogin } from './RutaConLogin';
	
export default function Rutas(props) {
	return (
		<Switch>
			{props.menu_y_rutas
					.filter((datosRuta) => (datosRuta.pagina!=null))
					.map((datosRuta, index) => (
						<RutaConLogin
							key={index}
							path={datosRuta.path}
							exact={datosRuta.esPrefijo!=true}
							necesitaLogin={!datosRuta.noNecesitaLogin}	
							children={<datosRuta.pagina {...props}/>}
						/>
					))}
		</Switch>	
	)
}
