import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Alert } from 'components/common/Alert';
import { Header } from 'components/common/Header';
import { Dashboard } from 'components/Dashboard';

const Routes = () => (
    <BrowserRouter>
        <div>
            <Alert/>
            <Header/>
            <Route path="/" render={() => <Dashboard/>} />
        </div>
    </BrowserRouter>
);

export { Routes };

