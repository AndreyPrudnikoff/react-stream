import React from 'react';
import { Link } from "react-router-dom";

function Nav(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/list-users">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/videos">Videos</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
