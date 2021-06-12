import React, { useState, useEffect } from 'react'

import _ from 'lodash'
import * as R from 'ramda'

import { Provider } from 'react-redux'
import { useSelector } from 'react-redux'

import 'semantic-ui-css/semantic.min.css'
import * as PaApi from '../services/pa-api'

import store from './store'
const action = (type, datos) => store.dispatch({type, datos})
const delEstado = listaProps => R.pipe(R.props(['pa']), R.nth(0), R.props(listaProps)) //U: una funcion que extrae las props de la lista del estado

/* DBG { */
window.R= R;
window.store= store;
window.PaApi= PaApi;
window.get_p= get_p;
/* DBG } */

import {
	HashRouter as Router, //U: sino, con el BrowserRouter tu servidor tiene que servir la misma pagina para cualqu ier url
	Link as RouterLink,
	Route,
	Switch,
} from "react-router-dom"

import { LoremIpsum, loremIpsum, name, surname, fullname, username } from 'react-lorem-ipsum'

import { useInput } from '../hooks/useInput'
import MarkdownPA from '../components/MarkdownPA'

import {
	Container,
	Divider,
	Dropdown,
	Grid,
	Header,
	Image,
	List,
	Menu,
	Segment,
	Icon,
	Label,
} from 'semantic-ui-react'
import { get_p, logmsg } from '../services/util'

const MiMenu= ({titulo}) => (
	<Menu fixed='top' inverted>
		<Container>
			<Menu.Item as={RouterLink} to={{pathname: '/foco'}} header>
				<Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
				{titulo||'Haciendo X'}	
			</Menu.Item>
			<Menu.Item as={RouterLink} position='right' to={{pathname: '/foco-banda'}}>
				<Icon loading name='group' />
			</Menu.Item>
			<Menu.Item as={RouterLink} to={{pathname: '/orientame'}}>
				<Icon name='compass' />
			</Menu.Item>
		</Container>
	</Menu>
)


const fixedOverlayMenuStyle = {
	transition: 'left 0.5s ease',
	position: 'fixed',
	bottom: '10px',
	right: '10px',
	zIndex: 10,
}

const Acciones= () => (
	<Menu
		icon='labeled'
		style={fixedOverlayMenuStyle}
		vertical
	>
		<Menu.Item>
			<Icon name='clipboard list' />
			Guardar	
		</Menu.Item>

		<Menu.Item>
			<Icon name='facebook' />
			Compartir	
		</Menu.Item>

		<Menu.Item>
			<Icon name='mail' />
			Email
		</Menu.Item>
	</Menu>
)

function PaginaUnTextoNav({params}) {
	return (
		<div style={{border: '1px dotted red', position: 'fixed', top: '50px', right: '0px', background: '#eee', height: '100vh', width: '2em', zIndex: 10}}>
				<div style={{transform:'rotate(90deg)', transformOrigin: 'left bottom',border: '1px dotted red', position: 'relative', width: '100vh', textAlign: 'center', }}>
					<button onClick={() => action('pa/API_BUSCAR_TEXTOS', { ...params, relativo: -1 })}>-Mes</button>
					<button onClick={() => action('pa/API_BUSCAR_TEXTOS', { ...params, relativo: -1 })}>-Semana</button>
					<button onClick={() => action('pa/API_BUSCAR_TEXTOS', { ...params, relativo: -1 })}>Anterior</button>
					<button onClick={() => action('pa/API_BUSCAR_TEXTOS', { ...params, relativo: 1 })}>Siguiente</button>
					<button onClick={() => action('pa/API_BUSCAR_TEXTOS', { ...params, relativo: 1 })}>+Semana</button>
					<button onClick={() => action('pa/API_BUSCAR_TEXTOS', { ...params, relativo: 1 })}>+Mes</button>
				</div>
			</div>
	)
}

function PaginaUnTexto() {
	const params= {cursor_id: 'PaginaUnTexto'};

	const texto= useSelector( s => get_p(s,'{pa{cursores{PaginaUnTexto{datos{actual') );

	useEffect(() => {
		action('pa/API_BUSCAR_TEXTOS', params);
	},[]);

	//IDEA: los controles para citar, me interesa, responder aparecen tocando parrafo
	return (
		<div>
			<MiMenu titulo="PaginaUnTexto"/>
			<Container text style={{ marginTop: '7em', width: '90vw', overflow: 'scroll' }}>
			{texto 
				? (
					<MarkdownPA controles={() => <Acciones />}>
						{texto.texto}
					</MarkdownPA>
				)
 				: '(cargando)'
			}
			</Container>
			<PaginaUnTextoNav params={params} />
		</div>
	)
}

function PaginaFoco() {
	return (
	<div>
		<MiMenu titulo="Foco"/>
		<Container text style={{ marginTop: '7em' }}>
			<h2>Con</h2>
				<div>
				<a href="#">pepe@hola.com (online)</a> <a href="#">mauriciocap@gmail.com</a>
					<div>
						<button>Buscar más personas</button>
					</div>
				</div>

			<h2>¿Cómo voy?</h2>
				<ul>
					<li>Repo en github <input /></li>
					<li>Función para ... <button>Completar</button></li>
				</ul>
				<p>
					<button>Agregar una nota</button>
					<button>Pregunta</button>
					<button>Necesito ayuda</button>
				</p>

			<h2>Usando</h2>
				<ul>
					<li>Texto pepito</li>
					<li>Charla ABC</li>
					<li>Otros recortes que junté</li>
				</ul>

			<h2>Para</h2>
				<p>Me sirve para ...</p>
		</Container>
	</div>
	)
}

function PaginaBanda() {
	return (
	<div>
		<Container text style={{ marginTop: '7em' }}>
			<h2>Con</h2>
				<div>
				<a href="#">pepe@hola.com (online)</a> <a href="#">mauriciocap@gmail.com</a>
					<div>
						<button>Buscar más personas</button>
					</div>
				</div>
		</Container>
	</div>
	)
}


function PaginaOrientame() {
	return (
		<div>
			<h1>Revisión general de como vas</h1>
				<h2>Tu presentación</h2>
				<h2>Tus proyectos</h2>
					<ul>
						<li>django, faltan 3 items, última actualización hace 3 días</li>
						<li>linkedin, faltan 2 items, última actualización hace 15 días</li>
					</ul>
				<h2>Tu banquito</h2>
		</div>
	)
}

function PaginaPropuestas() {
	return (
		<div>
			<h1>Propuestas en el grupo</h1>
				<h2>Hagamos una app de citas</h2>
					<p>Por XYZ, hace 5 días, se sumaron ABX 3hs django, MauricioCap 2hs consultoria, ...</p>
					<p>Ofrezco 20hs de diseño</p>
					<div>Pido django, react, UX</div>
					<ul>
						<li>3hs django, para ...</li>
						<li>5hs react, para ...</li>
					</ul>
		</div>
	)
}

function Editar() {
	const textareaRef= React.createRef();

	const [quiereVistaPrevia, setQuiereVistaPrevia]= useState(false);
	const [valores, setValores, cuandoCambiaInput]= useInput({});
	const [sugerencias, setSugerencias]= useState([]);
	const [sugerenciasPos, setSugerenciasPos]= useState([]);
	const [sugerenciaElegida, setSugerenciaElegida]= useState(0);

	const TAG_LEN_MAX= 20; //U: largo maximo de un tag, nombre de usuario

	const cuandoCambiaTextArea= (e) => {
		const ta= e.target;
		const sel0= ta.selectionStart
		const val= ta.value;

		setValores({ ...valores, texto: val});

		let search_pos_izq= sel0-1;
		for (; 0<=search_pos_izq ; search_pos_izq--) {
			if ((sel0-search_pos_izq)>TAG_LEN_MAX) { search_pos_izq= -1; } //A: ya buscamos demasiado
			else {
				let chr= val[search_pos_izq]; //A: vamos de der a izq
				//DBG: logmsg('TAi',{sel0, i, chr });	
				if (chr=='#' || chr=='@') { break; } //A: llegamos donde empieza search
				else if (! chr.match(/[a-z0-9\._-]/)) { search_pos_izq= -1 } //A: se corto
			}
		}

		if (0 <= search_pos_izq) {
			let search_pos_der= sel0; //A: arrancamos desde el cursor
			for (; search_pos_der < val.length && val[search_pos_der].match(/[a-z0-9\._-]/); search_pos_der++) {
			}

			let search= val.substr(search_pos_izq, search_pos_der - search_pos_izq)
			//DBG: logmsg('TA',{sel0, search });	
			if (search!='') {
				setSugerencias(R.range(1,6).map(n => (search[0]+'sugeri'+search.substr(1)+n)));
				setSugerenciasPos([search_pos_izq, search_pos_der]); //A: desde donde insertamos
				setSugerenciaElegida(0);
				return; 
			}
		}

		if (sugerencias.length>0) {
			setSugerencias([]);
			setSugerenciasPos([]); //A: desde donde insertamos
		}
	};

	const insertarSugerencia= (txt) => {
		logmsg('insertarSugerencia',{txt, sugerenciasPos});
		setValores({...valores, 
			texto: valores.texto.substr(0, sugerenciasPos[0]) + txt +	valores.texto.substr(sugerenciasPos[1])
		});
		setSugerenciasPos([sugerenciasPos[0], sugerenciasPos[0]+txt.length]);	
	} 

	const cuandoTeclaTextArea= (e) => {
		if (sugerencias.length==0) { return } //A: no hacemos nada
		if (!e.ctrlKey) { return } //A: no hacemos nada
		if (e.code=='ArrowDown') { 
			insertarSugerencia(sugerencias[sugerenciaElegida]);
			setSugerenciaElegida( (sugerenciaElegida+1) % sugerencias.length );
			e.preventDefault();
		}
	}

	return (
		<div>
			Editar
			<div>
				{sugerencias.map( s => 
					(<button onClick={() => insertarSugerencia(s)}>{s}</button>)
				)}
			</div>

			<textarea 
				name="texto"
				onChange={cuandoCambiaTextArea}
				value={valores.texto}
				onKeyDown={cuandoTeclaTextArea}
				style={{width: '100vw', height: '80vh', display: 'block'}}
			>
			</textarea>
		</div>
	)
}

function XApp() {
	const [quePagina, setQuePagina]= useState();
	return (
		<Router>
			<Switch>
				<Route path='/editar'>
					<Editar />
				</Route>
				<Route path='/propuestas'>
					<PaginaPropuestas />
				</Route>
				<Route path='/orientame'>
					<PaginaOrientame />
				</Route>
				<Route path='/foco-banda'>
					<PaginaBanda />
				</Route>
				<Route path='/foco'>
					<PaginaFoco />
				</Route>
				<Route path='/texto'>
					<PaginaUnTexto />
				</Route>
				<Route path='/' exact>
					<h1>Pantallas que quiero</h1>
					<ul>
						<li><RouterLink to='texto'>Texto</RouterLink></li>
						<li><RouterLink to='propuestas'>Propuestas</RouterLink></li>
					</ul>
					<MarkdownPA>
						Empieza en [orientame](/orientame)
					</MarkdownPA>
				</Route>
			</Switch>
		</Router>
	)
}

const Login= () => {
	const [ valores, setValores, cuandoCambiaInput ]= useInput();

	return (
		<div>
			Necesitás registrarte<br />	
			<input name="participante" onChange={cuandoCambiaInput} /><br />	
			<input name="clave" onChange={cuandoCambiaInput} type="password"/><br />	
			<button onClick={() => action('pa/SESION_REGISTRARSE', valores)}>Registrarse</button>
		</div>
	)
}

const Contenido= () => {
	const [tieneTokenVigente, participante, esperandoServidorPA]= useSelector( delEstado(['tieneTokenVigente','participante','esperandoServidorPA']) );

	useEffect(() => { //A: la primera vez
		action('pa/SESION_REVISAR');
	}, []);

	return (
		<div>
			{ esperandoServidorPA > 0 ? 'Esperando' : 'Listo' }
			<div>
				{ tieneTokenVigente 
				? <XApp />
				: <Login />
				}
			</div>
		</div>
	)
}

export default function App() {
	return (
		<Provider store={store}>
			<Contenido />
		</Provider>
	)
}

