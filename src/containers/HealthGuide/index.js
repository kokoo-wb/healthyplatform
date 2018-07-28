import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { Icon, Toast } from 'antd-mobile'
import { observer } from 'mobx-react'

// css
import styles from './index.less'

// constants
import Store from './store.js'

@observer
class HealthGuide extends React.Component {
    static defaultProps = {
        HealthGuideStore: Store.HealthGuideStore
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    handleClick = () => {
        Toast.info('暂无数据', 2);
    }


    render() {
        return (
            <div className={styles["health-guide"]}>
                <div className={styles["guide-item"]} onClick={this.handleClick}>
                    <p>32体质健康知识库</p>
                    <img src={require('../../statics/images/guide_icon_one.png')} />
                </div>
                <div className={styles["guide-item"]} onClick={this.handleClick}>
                    <p>8脏器健康知识库</p>
                    <img src={require('../../statics/images/guide_icon_two.png')} />
                </div>
                <div className={styles["guide-item"]} onClick={this.handleClick}>
                    <p>血型健康知识库</p>
                    <img src={require('../../statics/images/guide_icon_three.png')} />
                </div>
            </div>
        )
    }
}

export default HealthGuide
