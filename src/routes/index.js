import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Alert } from '../components/Alert';
import { Dashboard } from '../components/Dashboard';

export default () => (
    <BrowserRouter>
        <div>
            <header></header>
            <Alert/>
            <Route path="/" render={() => <Dashboard/>} />
            <footer></footer>
        </div>
    </BrowserRouter>
);
