import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import CrearEquipo from './Componentes/CRUD/Equipo/Crear';
import Foto from './Componentes/CRUD/Equipo/foto';
import VerEquipo from './Componentes/CRUD/Equipo/Ver';
import CrearEvento from './Componentes/CRUD/Evento/Crear';
import CrearEventoParaPartido from './Componentes/CRUD/Evento/CrearParaPartido';
import VerEvento from './Componentes/CRUD/Evento/Ver';
import CrearGrupo from './Componentes/CRUD/Grupo/Crear';
import VerGrupoIndividual from './Componentes/CRUD/Grupo/individual';
import VerGrupo from './Componentes/CRUD/Grupo/Ver';
import IniciarSesion from './Componentes/CRUD/LOGIN/iniciarSesion';
import NuevaCuenta from './Componentes/CRUD/LOGIN/nuevaCuenta';
import CrearPartido from './Componentes/CRUD/Partido/Crear';
import PartidosEnCurso from './Componentes/CRUD/Partido/partidosEnCurso';
import PartidoUnitario from './Componentes/CRUD/Partido/PartidoUnitario';
import VerPartido from './Componentes/CRUD/Partido/Ver';
import Despedida from './Componentes/Despedida';
import Inicio from './Componentes/Inicio'

const RouterConfig = () => {
    return (  <>
    <Routes>
        <Route path='/' element={<Inicio/>} />
        <Route path='/saludo' element={<Despedida/>} />
        
        <Route path='/grupo/:id'element={<VerGrupoIndividual/>}/>

        <Route path='/partidosTerminados'element={<PartidosEnCurso/>}/>
        
        <Route path='/verEquipos' element={<VerEquipo/>}/>
        <Route path='/verEventos'element={<VerEvento/>}/>
        <Route path='/verGrupos'element={<VerGrupo/>}/>
        <Route path='/partidos/:id'element={<PartidoUnitario/>}/>
        <Route path='/verPartidos'element={<VerPartido/>}/>

        <Route path='/partido/:id'element={<PartidoUnitario/>}/>

        <Route path='/equipofoto/:id'element={<Foto/>}/>

        <Route path='/partido/editar/:id'element={<CrearPartido/>}/>
        <Route path='/equipo/editar/:id'element={<CrearEquipo/>}/>
        <Route path='/grupo/editar/:id'element={<CrearGrupo/>}/>

        <Route path='/crearequipo' element={<CrearEquipo/>} />
        <Route path='/crearevento' element={<CrearEvento/>} />
        <Route path='/evento/editar/:id' element={<CrearEvento/>} />
        <Route path='/evento/crear/:id' element={<CrearEventoParaPartido/>} />
        <Route path='/creargrupo' element={<CrearGrupo/>} />
        <Route path='/crearpartido' element={<CrearPartido/>} />

        <Route path='/login' element={<IniciarSesion/>} />
        <Route path='/createAccount' element={<NuevaCuenta/>} />

    </Routes>
    </>);
}
 
export default RouterConfig;