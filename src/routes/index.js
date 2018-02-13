import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Alert } from '../components/Alert';
//import { Map } from '../components/Map;
import { Dashboard } from '../components/Dashboard';

export default () => (
    <BrowserRouter>
        <div>
            <Alert/>
            <Route path="/" exact render={() => <Dashboard/>} />
            {/* <Route path="/map" exact render={() => <Map/>} /> */}
        </div>
    </BrowserRouter>
);
