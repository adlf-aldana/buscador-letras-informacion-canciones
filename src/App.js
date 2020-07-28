import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Axios from 'axios';
import Letra from './components/Letra';
import Info from './components/Info';



function App() {

  const [buscarletra, setbuscarletra] = useState({})
  const [letra, guardarLetra] = useState('')
  const [info, guardarInfo] = useState({})

  useEffect(() => {
    if (Object.keys(buscarletra).length === 0) return;
    const { artista, cancion } = buscarletra;

    const consultandoApiLetra = async () => {
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([
        Axios.get(url),
        Axios.get(url2)
      ])
      // const respuesta = await Axios.get(url);
      // const respuesta2 = await Axios.get(url2);

      // guardarLetra(respuesta.data.lyrics);
      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0])
      
    }
    consultandoApiLetra();
  }, [buscarletra, info])

  return (
    <Fragment>
      <Formulario setbuscarletra={setbuscarletra} />

      <div className="container m-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
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
