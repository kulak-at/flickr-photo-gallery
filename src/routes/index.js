import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Alert } from 'components/Alert';
import { Dashboard } from 'components/Dashboard';
import { Header } from 'components/Header'

export default () => (
    <BrowserRouter>
        <div>
            <Alert/>
            <Header/>
            <Route path="/" render={() => <Dashboard/>} />
        </div>
    </BrowserRouter>
);
