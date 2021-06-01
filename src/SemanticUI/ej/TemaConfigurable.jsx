//INFO: semantic ui con temas configurables

import React, { useState } from 'react';
import {Helmet} from 'react-helmet'; //U: cambiar valores en html head
import { Button } from 'semantic-ui-react';

//LIB: https://github.com/podemosaprender/tpl_app_semilla/blob/8ddcd956af3646463c9930ac0479b4d273ef7c64/src/ui/0prelude.js#L368
const UiThemes= "cerulean chubby cosmo cyborg darkly flatly journal lumen paper readable sandstone simplex slate solar spacelab superhero united yeti".split(' '); //U: vienen preinstalados!

export default function App() {
	const [tema, setTema]= useState('chubby');

	return (
	<div className="application">
		<Helmet>
			<link rel="stylesheet" 
				href={`https://unpkg.com/semantic-ui-forest-themes@1.0.3/semantic.${tema}.css`}
			/>
		</Helmet>
		Hola 
		{ UiThemes.map(t => (
			<Button key={t} onClick={()=>setTema(t)}>
				{t}
			</Button>
		))}
	</div>
	)
}


