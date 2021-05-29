//INFO: punto de entrada principal a la App, mantenerlo limpio, tiene que servir de indice

import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from './ThemeProvider.js';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ProvideServidorPodemosAprender} from '../contexts/ServidorPodemosAprender';

export default function ContextoComun({children}) {
	return (
		<ThemeProvider>
			<CssBaseline/>
			<ProvideServidorPodemosAprender>
				{children}
			</ProvideServidorPodemosAprender>
		</ThemeProvider>
	);
}

ContextoComun.propTypes= {
	children: PropTypes.node,
}
