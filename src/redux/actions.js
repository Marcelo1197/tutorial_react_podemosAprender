export const incrementar = () => {
  return {
    type: "INCREMENTAR_CONTADOR",
  }
}

export const decrementar = () => {
  return {
    type: "DECREMENTAR_CONTADOR",
  }
}

export const resetear = () => {
  return {
    type: "RESETEAR_CONTADOR"
  }
}