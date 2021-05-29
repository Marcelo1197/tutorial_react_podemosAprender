import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import IconoBrujula from '@material-ui/icons/Explore';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function NavArriba() {
	const classes = useStyles();

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h5" className={classes.title}>
					Mockup de UI leer texto	
				</Typography>
				<IconButton aria-label="Orientame" color="inherit"><IconoBrujula /></IconButton>
			</Toolbar>
		</AppBar>
	);
}

