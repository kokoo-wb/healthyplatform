import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { Icon } from 'antd-mobile'
import { observer } from 'mobx-react'

// css
import styles from './index.less'

// constants
import Store from './store.js'

import { show_lunar_calendar } from '../../utils/utils'

@observer
class DietSuggest extends React.Component {
    static defaultProps = {
        DietSuggestStore: Store.DietSuggestStore
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (!localStorage.getItem('login_session')) {
            this.props.history.push('/login')
            return false
        }
        this.props.DietSuggestStore.getSuggestInfo({
            sessionvalue: localStorage.getItem("login_session")
        }, this.props.history)
    }
    componentDidMount() {

    }


    render() {
        const { healthUser, weakdirty, bloodtype, dietprin, ivoid, goodfood, healthcare } = this.props.DietSuggestStore
        console.log(dietprin)
        return (
            <div className={styles["diet-suggest"]}>
                <div className={styles.header}>
                    <div className={styles["report-left"]}>
                        <p className={styles["report-detail-one"]}><label>{healthUser.username}</label><i>-{healthUser.bodytype + bloodtype}体质</i></p>
                        <p className={styles["report-detail-two"]}><label>您的生日：</label><i>{healthUser.yangbirthday ? healthUser.yangbirthday + ' ' + show_lunar_calendar(healthUser.yangbirthday) : ''}<br />{healthUser.yinyear}年 {healthUser.yinmonth}月 {healthUser.yinday}日</i></p>
                        <p className={styles["report-detail-two"]}><label>您的属相：</label><i>{healthUser.zodiac}</i></p>

                    </div>
                    <div className={styles["report-right"]}>
                        <p className={styles["report-detail-four"]}><label>您的弱脏：</label><i>{weakdirty}</i></p>
                        <p className={styles["report-detail-five"]}><label>您的血型：</label><i>{bloodtype}型</i></p>
                        <p className={styles["report-detail-six"]}><label>您的性别：</label><i>{healthUser.genger}</i></p>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles["content-list"]}>
                        <h2>{healthUser.bodytype + bloodtype}体质的基础保健：</h2>
                        {dietprin && (
                            <div className={styles["content-item"]}>
                                <h4>◆ 饮食原则</h4>
                                {dietprin.map((item, index) => <p key={index}>{item}</p>)}
                            </div>
                        )}

                        {goodfood && (
                            <div className={styles["content-item"]}>
                                <h4>◆ 有益食品</h4>
                                {goodfood.map((item, index) => <p key={index}>{item}</p>)}
                            </div>
                        )}

                        {healthcare && (
                            <div className={styles["content-item"]}>
                                <h4>◆ 养生保健</h4>
                                {healthcare.map((item, index) => <p key={index}>{item}</p>)}
                            </div>
                        )}

                        {ivoid && (
                            <div className={styles["content-item"]}>
                                <h4>◆ 避免伤害</h4>
                                {ivoid.map((item, index) => <p key={index}>{item}</p>)}
                            </div>
                        )}

                        <h4><i>*</i> 声明：</h4>
                        <p> 1、本报告图片为数字模拟图片，将更好的表现数据的可读性，提示的紧张、敏感问题仅供参考，不具备疾病诊断的功能；<br />2、生命能量预警不同于医院体检，是对检测者整体健康状况的全面测评，健康预警具有健康唤醒，健康教育的功能和意义； <br />3、本报告提供丰富的知识和经验，为检测者采取积极和健康改善、促进行动提供依据，供检测者参考执行。</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DietSuggest
