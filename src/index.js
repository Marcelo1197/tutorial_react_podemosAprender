
import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';

import { store } from "./redux/store";

import App from './App.js';

import "./index.css"; //U: lo que SEGURO es comun a todas las ideas, ej. margen 0, tipografia, etc.

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById("root"));

