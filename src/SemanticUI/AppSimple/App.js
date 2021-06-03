import 'semantic-ui-css/semantic.min.css'

import _ from 'lodash';

import React, { useState } from "react";
import {
	HashRouter as Router, //U: sino, con el BrowserRouter tu servidor tiene que servir la misma pagina para cualqu ier url
	Link as RouterLink,
	Route,
	Switch,
} from "react-router-dom";

import { LoremIpsum, loremIpsum, name, surname, fullname, username } from 'react-lorem-ipsum';

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
	//IDEA: los controles para citar, me interesa, responder aparecen tocando parrafo
	return (
		<div>
			<MiMenu />
			<Acciones />
			<Container text style={{ marginTop: '7em' }}>
				<Header as='h1'>Semantic UI React Fixed Template</Header>
				<div>
					{ _.range(20).map( x => {
						const [verControles, setVerControles]= useState(false);
						return (<>
							<p key={x} onClick={() => setVerControles(true)}>
								{ loremIpsum() }
							</p>
							<div style={{display: verControles ? 'block' : 'none'}}>
								<button onClick={() => setVerControles(false)}>Citar</button>
								Otras cosas que podes hacer con este texto/parrafo
							</div>
							</>
						)
					}) }
				</div>
			</Container>
			<div style={{position: 'fixed', bottom: 0, background: '#eee', width: '100%', height: '2em',textAlign:'center'}}>
				Aca quiero una barrita tipo linea de tiempo, con un boton bien a la izq para ir un texto atras, uno bien a la der para ir uno adelante
			</div>
		</div>
	)
}

function PaginaFoco() {
	return (
	<div>
		<MiMenu />
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


function PaginaOrientame() {
	return (
		<div>
			Revisión general de como vas	
		</div>
	)
}

export default function App() {
	const [quePagina, setQuePagina]= useState();
	return (
		<Router>
			<Switch>
				<Route path='/orientame'>
					<PaginaOrientame />
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
					</ul>
				</Route>
			</Switch>
		</Router>
	)
}

