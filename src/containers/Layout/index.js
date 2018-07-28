import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'

// css
import 'public/css/global.less'

class Layout extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {this.props.routes && this.props.routes.map((route, i) => (
                    < Route path={route.path} key={i} render={
                        props => (
                            < route.component { ...props } routes={route.routes} />
                        )}
                    />
                ))}
            </div>
        )
    }
}

Layout.propTypes = {
    children: PropTypes.node
}

export default Layout
