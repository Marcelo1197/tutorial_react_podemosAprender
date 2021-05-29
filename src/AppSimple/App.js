import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import NavArriba from './NavArriba';
import NavAbajo from './NavAbajo';

import { LoremIpsum } from "react-lorem-ipsum";  //U: para generar texto simulado en este estudio


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
		overflow: 'scroll',
	},
	navAbajo: {
		padding: theme.spacing(3, 2),
		marginTop: 'auto',
	},
}));

export default function App() {
	const classes = useStyles();

	const cuandoAccion= (queQuiere) => alert(queQuiere);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<NavArriba className={classes.navArriba}/>
			<Container component="main" className={classes.main} maxWidth="sm">
				<Typography variant="h2" component="h1" gutterBottom>
					Sticky footer
				</Typography>
				<Typography variant="h5" component="h2" gutterBottom>
					{'Pin a footer to the bottom of the viewport.'}
					{'The footer will move as the main element of the page grows.'}
				</Typography>
				<LoremIpsum p={10} />	
				<Typography variant="body1">Sticky footer placeholder.</Typography>
			</Container>
			<NavAbajo className={classes.navAbajo} onClick={cuandoAccion}/>
		</div>
	);
}



