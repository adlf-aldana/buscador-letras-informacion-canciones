import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Axios from 'axios';
import Letra from './components/Letra';



function App() {

  const [buscarletra, setbuscarletra] = useState({})
  const [letra, guardarLetra] = useState('')
  const [info, guardarInfo] = useState({})

  useEffect(() => {
    if (Object.keys(buscarletra).length === 0) return;
    const { artista, cancion } = buscarletra;

    const consultandoApiLetra = async () => {
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = ` theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([
        Axios.get(url),
        Axios.get(url2)
      ])
      // const respuesta = await Axios.get(url);
      // const respuesta2 = await Axios.get(url2);

      // guardarLetra(respuesta.data.lyrics);
      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artista[0])
    }
    consultandoApiLetra();
  }, [buscarletra])

  return (
    <Fragment>
      <Formulario setbuscarletra={setbuscarletra} />

      <div className="container m-5">
        <div className="row">
          <div className="col-md-6">

          </div>
          <div className="col-md-6">
            <Letra letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
