//INFO: punto de entrada principal a la App, mantenerlo limpio, tiene que servir de indice

import React, {useEffect} from 'react';

import ContextoComun from '../components/ContextoComun';
import Rutas from '../components/Rutas';

//S: paginas que voy a mostrar *******************************

import Login from '../pages/Login/Login';
import Textos from './components/TextosLeer';
import PaginaModoDesarrollo from '../pages/ModoDesarrollo';
import PaginaNoImplementada from '../pages/NoImplementada';

//S: las que todavia no implemente en su archivo *************
import Marco from './components/Marco';
import { Link, useHistory } from 'react-router-dom';
import { useServidorPodemosAprender } from '../contexts/ServidorPodemosAprender';

function PaginaLogout(props) {
	const { usuario, logout }= useServidorPodemosAprender();
	useEffect( () => logout(), [usuario] );

	return (
		<Marco cuandoAccion={props.cuandoAccion}>
			ToDo<br /> 
			Volver a <Link to={{pathname: '/'}}>inicio</Link><br />
		</Marco>
	);
}


function PaginaInicio(props) {
	return (
		<Marco cuandoAccion={props.cuandoAccion} foco='Orientame'>
			ToDo<br /> 
			<Link to={{pathname: '/textos/'}}>textos</Link><br />
			<Link to={{pathname: '/devel/'}}>modo desarrollo</Link><br />
			<Link to={{pathname: '/logout'}}>logout</Link><br />
		</Marco>
	);
}


//S: Una lista de rutas y que hacer cuando se abren **********
const MenuYRutas = [
	{
		path: '/login',
		pagina: Login,
		noNecesitaLogin: true,
		//A: sin descripcion no se muestra en el menu
	},

	{
		path: '/',
		dsc: 'Inicio',
		pagina: PaginaInicio,
		noNecesitaLogin: true,
	},
	{
		path: '/logout',
		dsc: 'Logout',
		pagina: PaginaLogout,
		noNecesitaLogin: true,
	},
	{
		path: '/textos/',
		esPrefijo: true, //A: necesita para queryParams ej ?fecha_min=
		dsc: 'Textos',
		pagina: Textos,
	},
	{
		path: '/devel/',
		dsc: 'Servidor',
		pagina: PaginaModoDesarrollo,
		noNecesitaLogin: true,
	},
	{
		path: '*',
		pagina: PaginaNoImplementada,
		noNecesitaLogin: true,
	}
];

//S: la aplicacion principal *********************************
//A: en este caso solo define el contexto y cada página se dibuja como quiere
export default function App() {

	const RutasYNavegacion= () => { //U: necesito un componente aparte pq useHistory debe estar dentro de Router
		const history= useHistory();
		const cuandoAccion= (queQuiere) => {
			if (queQuiere=='orientame') { history.push('/'); }
			else { alert('cuandoAccion '+queQuiere); }
		};

		return <Rutas menu_y_rutas={MenuYRutas} cuandoAccion={cuandoAccion} />;
	};

	return (
		<ContextoComun>
			<RutasYNavegacion />
		</ContextoComun>
	);
}
