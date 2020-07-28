import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';

function App() {

  const [buscarletra, setbuscarletra] = useState({})

  useEffect(() => {
    if (Object.keys(buscarletra).length === 0) return;
    const { artista, cancion } = buscarletra;

    const consultandoApiLetra = async () => {
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
    }

  }, [buscarletra])

  return (
    <Fragment>
      <Formulario setbuscarletra={setbuscarletra} />
    </Fragment>
  );
}

export default App;
