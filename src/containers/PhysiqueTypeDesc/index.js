import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { Icon, message, Select, Spin, Input, Dropdown, Menu, DatePicker } from 'antd-mobile'
import { observer } from 'mobx-react'

// css
import styles from './index.less'

// components
import Share from 'iComponents/Share'
import Attention from 'iComponents/Attention'

// constants
import Store from './store.js'

@observer
class PhysiqueTypeDesc extends React.Component {
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

        return (
            <div className={styles["type-container"]}>
                <div className={styles["type-desc"]}>
                    <h2>什么是32体质？</h2>
                    <p>
                        <img src={require('public/images/physique_pic1.png')} />
                    </p>
                    <p>
                        <span>你知道吗？人体全身有众多器官，但有8个脏器对于生命健康具有至关重要的意义。分别是</span>
                        <strong>头、肺、胆、心、肝、肾、胃、脾</strong>
                    </p>
                    <p>
                        <img src={require('public/images/physique_pic2.png')} />
                    </p>
                    <p>
                        <strong>出生日期不同，决定了每个人不同的当家脏器，</strong>
                        <span>这个脏器就像执政党一样，统领机体的五脏六腑。我们也被划分为</span>
                        <strong>8脏器体质：头体质、肺体质。。</strong>
                    </p>
                    <p>
                        <img src={require('public/images/physique_pic3.png')} />
                    </p>
                    <p>
                        <span>但同一种脏器体质的人，因其不同血型，会表现出不同的健康规律，因此</span>
                        <strong>8脏器 X 4血型，共有32体质。</strong>
                    </p>
                    <p>
                        <img src={require('public/images/physique_pic4.png')} />
                    </p >
                    <p>
                        <strong>不同体质有其独特的饮食、运动、用药、治疗健康规律。</strong>
                    </p>
                    <p>如：</p>
                    <p>头O体质的万病从头入，有病从“头”入手，才能根治</p>
                    <p>胆AB体质的人易上火，但败火切忌苦寒食材</p>
                    <p>肝B体质的人，严禁饮酒，适宜吃鸡肉护肝</p>
                    <p>
                        <img src={require('public/images/physique_pic5.png')} />
                    </p >
                </div>

                <Attention />

                <Share />
            </div>
        )
    }
}

export default PhysiqueTypeDesc
