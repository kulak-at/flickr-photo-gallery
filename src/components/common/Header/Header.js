import React from 'react';
import MaterialIcon from 'material-icons-react';
import './Header.css';

const Header = () => (
    <header>
        <nav className="navbar navbar-dark bg-primary navbar-centered">
            <MaterialIcon icon="camera" size='large'/>
            <h1 className="navbar-brand mb-0 pl-2">Flickr Photo Gallery</h1>
        </nav>
    </header>
);

export { Header };
