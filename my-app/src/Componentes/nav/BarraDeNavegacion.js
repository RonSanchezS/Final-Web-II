import React from 'react'
import { Link } from 'react-router-dom';
import IfToken from '../CRUD/LOGIN/ifLogin';
import IfNotToken from '../CRUD/LOGIN/ifnotLogin';
const BarraDeNavegacion = () => {
    return (<>
        <nav>
            <div className="navbar is-primary">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                    </a>
                    <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div id="navbarExampleTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="/">
                            Inicio
                        </a>
                        <Link className="navbar-item" to="/partidosTerminados">
                            Partidos en curso/terminados
                        </Link>
                        {
                            localStorage.getItem('token') ? <><IfToken/>
                            </> : <IfNotToken/>
                        }

                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <p className="control">
                                    <a className="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:3000" target="_blank" href="https://twitter.com/intent/tweet?text=My%20homepage%20http://localhost:3000">
                                        <span className="icon">
                                            <i className="fab fa-twitter"></i>
                                        </span>
                                        <span>
                                            Tweet
                                        </span>
                                    </a>
                                </p>
                                <p className="control">
                                    <a className="button is-primary" href=""></a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>);
}

export default BarraDeNavegacion;