//INFO: temas configurables por nombre

/* FUTURO: ahora lo implementamos con semantic-ui PERO queda "escondido" en este archivo
	El único compromiso es que exportamos una lista de nombres en Temas y un tag Tema para establecerlo
*/

import React, { useState } from 'react';
//VER: https://github.com/nfl/react-helmet
import {Helmet} from 'react-helmet'; //U: cambiar valores en html head

//LIB: https://github.com/podemosaprender/tpl_app_semilla/blob/8ddcd956af3646463c9930ac0479b4d273ef7c64/src/ui/0prelude.js#L368
export const Temas= "cerulean chubby cosmo cyborg darkly flatly journal lumen paper readable sandstone simplex slate solar spacelab superhero united yeti".split(' '); //U: vienen preinstalados!


export default function Tema({tema_id}) {
	return (
		<Helmet>
			<link rel="stylesheet" 
				href={`https://unpkg.com/semantic-ui-forest-themes@1.0.3/semantic.${tema_id}.css`}
			/>
		</Helmet>
	)
}


