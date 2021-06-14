//INFO: entrada a la aplicacion, solo cargar estilos, fonts, ...
import React from "react";
import ReactDOM from "react-dom";

import "@fontsource/roboto"; //VER: https://material-ui.com/components/typography/#general
import "./index.css"; //U: lo que SEGURO es comun a todas las ideas, ej. margen 0, tipografia, etc.

//import App from "./AppSimple/App";
//import App from "./AppConMenu/App";
//import App from "./ej/RutaRequiereLoginUnaVez"
//import App from "./ej/Contextos"
//import App from "./ej/ServidorPodemosAprender"
//import App from './ej/MarkdownReact'

// import App from './SemanticUI/ej/TemaConfigurable'
// import App from './SemanticUI/AppSimple/App'

//import App from './s_sagas/App'
import App from './PAApp/App'

ReactDOM.render(<App />, document.getElementById("root"));

