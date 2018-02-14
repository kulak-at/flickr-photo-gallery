import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Alert } from '../components/Alert';
import { Dashboard } from '../components/Dashboard';

export default () => (
    <BrowserRouter>
        <div>
            <Alert/>
            <Route path="/" render={() => <Dashboard/>} />
        </div>
    </BrowserRouter>
);
