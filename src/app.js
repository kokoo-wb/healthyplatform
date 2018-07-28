import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import {
    routes,
    createRoutes
} from './router'

render(
    <BrowserRouter>
        <div>
            {routes.map((route, i) => (
                <Route path={route.path} key={i} render={props => (
                    <route.component {...props} routes={route.routes} />
                )} />
            ))}
        </div>
    </BrowserRouter>
    , document.getElementById('app')
)
