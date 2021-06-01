import 'semantic-ui-css/semantic.min.css'
import React from "react";
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
export default function App() {
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

