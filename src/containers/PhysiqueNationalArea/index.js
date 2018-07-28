import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { Icon, message, Select, Spin, Input, Dropdown, Menu, DatePicker } from 'antd-mobile'
import { observer } from 'mobx-react'

// css
import styles from './index.less'

// constants
import Store from './store.js'

@observer
class PhysiqueNationalArea extends React.Component {
    static defaultProps = {
        currStore: Store.InitStore
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.currStore.getCheckpoint(
            {aa: "aa"}
        )
    }

    render() {
        const { nationalAreaList } = this.props.currStore

        return (
            <div>
                <ul className={styles["national-area-list"]}>
                    {nationalAreaList.map((item, index) => (
                        <li key={index}>
                            <p>{item.city}</p>
                            <p>地址：{item.address}</p>
                            <p>电话：{item.phone}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default PhysiqueNationalArea
