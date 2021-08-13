import React from "react";
import { useSelector } from "react-redux";

export default function ContadorBarritas() {

  const contador = useSelector(state => state);
  return (
    <div className="contador-barritas">
      <h1>{contador}</h1>
    </div>
  );
}