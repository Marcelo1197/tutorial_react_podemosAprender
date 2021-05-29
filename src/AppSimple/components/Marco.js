//INFO: un marco con navegacion, acciones para mostrar textos, etc.

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import NavArriba from './NavArriba';
import NavAbajo from './NavAbajo';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
	},
	navArriba: {
	},
	main: {
		minWidth: '100vw',
		flexGrow: 1,
		overflow: 'scroll',
	},
	navAbajo: {
		padding: theme.spacing(3, 2),
		marginTop: 'auto',
	},
}));

export default function Marco(props) {
	const classes = useStyles();


	return (
		<div className={classes.root}>
			<NavArriba className={classes.navArriba} 
				onClick={props.cuandoAccion} 
				foco={props.foco}
			/>

			<Container component="main" className={classes.main} maxWidth="sm">
				{props.children}
			</Container>

			<NavAbajo className={classes.navAbajo} onClick={props.cuandoAccion}/>
		</div>
	);
}



