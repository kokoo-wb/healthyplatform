import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Layout from '../containers/Layout'
import Personal from '../containers/Personal';
import PhysiqueType from '../containers/PhysiqueType';
import PhysiqueTypeDesc from '../containers/PhysiqueTypeDesc';
import PhysiqueCheck from '../containers/PhysiqueCheck';
import PhysiqueNationalArea from '../containers/PhysiqueNationalArea';
import PhysiqueAppointment from '../containers/PhysiqueAppointment';
import MyHealth from '../containers/MyHealth';
import MyReport from '../containers/MyReport';
import DietSuggest from '../containers/DietSuggest';
import HealthGuide from '../containers/HealthGuide';
import Knowledge from '../containers/Knowledge';
import ReportDetail from '../containers/ReportDetail';
import PhysiqueReport from '../containers/PhysiqueReport';
import Register from '../containers/Register';
import Login from '../containers/Login';
import UserInfo from '../containers/UserInfo';
import ChangePhone from '../containers/ChangePhone';
import ChangePassword from '../containers/ChangePassword';
import ForgetPassword from '../containers/ForgetPassword';

const routes = [
    {
        path: '/',
        component: Layout,
        routes: [
            {
                path: '/personal',
                component: Personal
            },
            {
                path: '/physiquetype',
                component: PhysiqueType
            },
            {
                path: '/physiquetypedesc',
                component: PhysiqueTypeDesc
            },
            {
                path: '/nationalarea',
                component: PhysiqueNationalArea
            },
            {
                path: '/selfcheck',
                component: PhysiqueCheck
            },
            {
                path: '/appointment',
                component: PhysiqueAppointment
            },
            {
                path: '/myhealth',
                component: MyHealth
            },
            {
                path: '/myreport',
                component: MyReport
            },
            {
                path: '/dietsuggest',
                component: DietSuggest
            },
            {
                path: '/healthguide',
                component: HealthGuide
            },
            {
                path: '/knowledge',
                component: Knowledge
            },
            {
                path: '/reportdetail',
                component: ReportDetail
            },
            {
                path: '/physiquereport',
                component: PhysiqueReport
            },
            {
                path: '/register',
                component: Register
            },
            {
                path: '/login',
                component: Login
            },
            {
                path: '/userinfo',
                component: UserInfo
            },
            {
                path: '/changephone',
                component: ChangePhone
            },
            {
                path: '/changepassword',
                component: ChangePassword
            },
            {
                path: '/forgetpassword',
                component: ForgetPassword
            }
        ]
    }
]

const createRoutes = (routeList) => {
    const arr = routeList.map((route, i) => (
        <Route path={route.path} key={i} render={props => (
            <route.component {...props} routes={route.routes} />
        )} />
    ))
    return arr
}

export {
    routes,
    createRoutes
}
