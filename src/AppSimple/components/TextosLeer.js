import React from 'react';

import Marco from './Marco';

import Typography from '@material-ui/core/Typography';
import { LoremIpsum } from "react-lorem-ipsum";  //U: para generar texto simulado en este estudio

export default function TextosLeer(props) {
	return (
		<Marco {...props}>
			<Typography variant="h2" component="h1" gutterBottom>
				Sticky footer
			</Typography>
			<Typography variant="h5" component="h2" gutterBottom>
				{'Pin a footer to the bottom of the viewport.'}
				{'The footer will move as the main element of the page grows.'}
			</Typography>
			
			<Typography variant="body1" component="div">
				<LoremIpsum p={10} />
			</Typography>
		</Marco>
	);
}



