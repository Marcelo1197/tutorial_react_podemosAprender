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
import { get_p } from '../services/util'

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
			Share
		</Menu.Item>

		<Menu.Item>
			<Icon name='mail' />
			Email
		</Menu.Item>
	</Menu>
)

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
				<MarkdownPA>
					{texto ? texto.texto : '(cargando)'}
				</MarkdownPA>
			</Container>
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


function XApp() {
	const [quePagina, setQuePagina]= useState();
	return (
		<Router>
			<Switch>
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

