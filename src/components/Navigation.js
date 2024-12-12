import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='navigation'>
            <ul>
                <NavLink to={"/"} className={(link)=> link.isActive ? "active-link" : ""}>
                    <li>
                        Accueil
                    </li>
                </NavLink>
                <NavLink to={"/favoris"} className={(link)=> link.isActive ? "active-link" : ""}>
                    <li>
                        Coups de coeur
                    </li>
                </NavLink>
            </ul>
            <h1>App Cinema</h1>
        </div>
    );
};

export default Navigation;