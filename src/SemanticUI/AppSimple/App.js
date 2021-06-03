import 'semantic-ui-css/semantic.min.css'

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
} from 'semantic-ui-react'

const MiMenu= () => (
	<Menu fixed='top' inverted>
		<Container>
			<Menu.Item as='a' header>
				<Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
				Project Name
			</Menu.Item>
			<Menu.Item as='a' position='right'>Acciones</Menu.Item>
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
			<Icon name='twitter' />
			Twitter
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
	return (
		<div>
			<MiMenu />
			<Acciones />
			<Container text style={{ marginTop: '7em' }}>
				<Header as='h1'>Semantic UI React Fixed Template</Header>
				<div>
					<LoremIpsum p={20} />
				</div>
			</Container>
		</div>
	)
}

export default function App() {
	const [quePagina, setQuePagina]= useState();
	return (
		<Router>
			<Switch>
				<Route path='/texto'>
					<PaginaUnTexto />
				</Route>
				<Route path='/' exact>
					<RouterLink to='texto'>Texto</RouterLink>	
				</Route>
			</Switch>
		</Router>
	)
}

