import React from 'react';
import { Link } from 'react-router-dom';
const IfNotToken = () => {
    return (<><Link className="navbar-item" to="/login">
        Login
    </Link>
        <Link className="navbar-item" to="/createAccount">
            Crear cuenta
        </Link>

    </>);
}

export default IfNotToken;