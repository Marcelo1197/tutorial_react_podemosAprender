export const reducerContador = (estado, accion) => {
  switch (accion.type) {
    case "INCREMENTAR_CONTADOR":
      return estado + 1;
    case "DECREMENTAR_CONTADOR":
      return estado - 1;
    case "RESETEAR_CONTADOR":
      return 0;
    default:
      return estado;
  }
}