import { createStore } from "redux";

import { reducerContador } from "./reducers";

//DBG const REDUX_DEVTOOLS_ON = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(reducerContador, 0);