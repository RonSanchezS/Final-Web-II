import React from 'react'
import { Link } from 'react-router-dom';
const IfToken = () => {
    return (<>
        <Link className="navbar-item" onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
        }} to="/">
            Logout
        </Link>
        <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
                CRUD
            </a>
            <div className="navbar-dropdown is-boxed">
                <Link className="navbar-item" to={"/verEquipos"}>Equipos</Link>
                <Link className="navbar-item" to={"/verEventos"}>Eventos</Link>
                <Link className="navbar-item" to={"/verGrupos"}>Grupos</Link>
                <Link className="navbar-item" to={"/verPartidos"}>Partidos</Link>
            </div>
        </div>
    </>);
}

export default IfToken;