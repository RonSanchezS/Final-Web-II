import logo from './logo.svg';
import './App.css';
import './CSS/styles1.css'
import './CSS/grupos.css'
//import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import RouterConfig from './RouterConfig';
//import bulma from 'bulma/css/bulma.css';
import 'bulma/css/bulma.min.css';
import BarraDeNavegacion from './Componentes/nav/BarraDeNavegacion';
import axios from 'axios';
function App() {
  //global variable referencing http://127.0.0.1:8000/
  window.API_URL = 'http://127.0.0.1:8000/';

  axios.defaults.headers.post['Content-Type'] = 'application/json';

  return (
    <>
      <BarraDeNavegacion></BarraDeNavegacion>
      <RouterConfig />
    </>

  );
}

export default App;
