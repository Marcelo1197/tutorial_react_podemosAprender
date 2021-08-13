import React from "react";

import { useSelector } from "react-redux";

export default function ContadorNumeros() {
  const contador = useSelector(state => state);

  return <div>
    <div className="contador-numeros">
      <h1>{contador}</h1>
    </div>
  </div>
}