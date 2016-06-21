import React, { Component } from "react";
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from "./App.jsx";
import Home from "./Home.jsx";

export default class Routers extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
					<IndexRoute component={Home}/>
                </Route>
            </Router>
        )
    }
}
