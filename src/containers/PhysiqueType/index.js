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
class PhysiqueType extends React.Component {
    static defaultProps = {
        demoStore: Store.DemoStore
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    addCount = () => {
        this.props.demoStore.addCount();
    }


    render() {
        const organlist = [
            { name: '头', imgUrl: require('public/images/brain.png') },
            { name: '肺', imgUrl: require('public/images/lung.png') },
            { name: '胆', imgUrl: require('public/images/gallbladder.png') },
            { name: '心', imgUrl: require('public/images/heart.png') },
            { name: '肝', imgUrl: require('public/images/liver.png') },
            { name: '肾', imgUrl: require('public/images/kidney.png') },
            { name: '胃', imgUrl: require('public/images/stomach.png') },
            { name: '脾', imgUrl: require('public/images/spleen.png') }
        ];

        const physiqueList = [
            { imgUrl: require('public/images/A.png') },
            { imgUrl: require('public/images/B.png') },
            { imgUrl: require('public/images/AB.png') },
            { imgUrl: require('public/images/O.png') }
        ];

        console.log(organlist)

        return (
            <div>
                <ul className={styles["organ-list"]}>
                    {organlist.map((item, index) => (
                        <li key={index}>
                            <img src={item.imgUrl} />
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>

                <ul className={styles["physique-list"]}>
                    {physiqueList.map((item, index) => (
                        <li key={index}>
                            <img src={item.imgUrl} />
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default PhysiqueType
