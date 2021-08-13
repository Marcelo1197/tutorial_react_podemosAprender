import React from "react";

import { Provider } from 'react-redux'
import { useDispatch } from 'react-redux'

import {incrementar, decrementar, resetear } from "./redux/actions";

import ContadorBarritas from "./components/ContadorBarrita";
import ContadorNumeros from "./components/ContadorNumeros";

import "./App.css"

export default function App() {

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Aprendemos Redux!</h1>
      <ContadorNumeros />
      <ContadorBarritas />

      <button onClick={() => dispatch(incrementar())}> + </button>
      <button onClick={() => dispatch(decrementar())}> - </button>
      <button onClick={() => dispatch(resetear())}> RESETEAR </button>
    </div>
  );
}