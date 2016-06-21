import React from "react";
import ReactDOM from "react-dom";

import Routers from "./app/Routers";
import reducers from './app/reducers';

import userMiddleware from "./user/UserMiddleware";
import appMiddleware from "./app/AppMiddleware";

import { createStore, applyMiddleware } from 'redux';
let store = createStore(
    reducers,
    applyMiddleware(
        appMiddleware,
        userMiddleware
    )
);
import { Provider } from 'react-redux';


ReactDOM.render(
    <Provider store={store}>
        <Routers />
    </Provider>,
    document.getElementById('app')
);
