const crearToken = () => {
  const tokenGenerado = Math.random().toString(36).slice(2);
  return tokenGenerado;
};


export {
    matchPassword,
    encrypPassword,
    crearToken
}