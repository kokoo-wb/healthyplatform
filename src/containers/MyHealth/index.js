import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { Icon } from 'antd-mobile'
import { observer } from 'mobx-react'

// css
import styles from './index.less'

// components
import Share from 'iComponents/Share'

// constants
import Store from './store.js'
import {observable} from "mobx/lib/mobx";

@observer
class MyHealth extends React.Component {
    static defaultProps = {
        MyHealthStore: Store.MyHealthStore
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if(!localStorage.getItem('login_session')){
            this.props.history.push('/login')
            return false
        }

        this.props.MyHealthStore.getMyHealth({
            sessionvalue: localStorage.getItem('login_session')
        })
    }

    componentDidMount() {

    }

    render() {
        const {healthUser,weakdirty,bloodtype,harmful,healthpoint,selfintro,healthWT,charactertd,bodytypeatten} = this.props.MyHealthStore

        return (
            <div className={styles["my-health"]}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{healthUser.username}-{healthUser.bodytype+bloodtype}体质</h1>
                    <p className={styles.birthday}><label>您的生日：</label><i>{healthUser.yangbirthday + ' ' }<br/>{healthUser.yinyear}年 {healthUser.yinmonth}月 {healthUser.yinday}日</i></p>
                    <p className={styles["symbolic-animals"]}><label>您的属相：</label><i>{healthUser.zodiac}</i></p>
                    <p className={styles["blood-type"]}><label>您的血型：</label><i>{bloodtype}型</i></p>
                    <p className={styles["weak-organ"]}><label>您的弱脏：</label><i>{weakdirty}</i></p>
                    <p className={styles.sex}><label>您的性别：</label><i>{healthUser.genger}</i></p>
                </div>
                <div className={styles["health-intro"]}>
                    <div className={styles.icon}>
                        {healthUser.bodytype=='头' ? (<img src={require('../../statics/images/brain.png')} />):
                            (healthUser.bodytype=='肺' ? (<img src={require('../../statics/images/lung.png')}/>):
                                (healthUser.bodytype=='胆' ? (<img src={require('../../statics/images/brain.png')}/>):
                                    (healthUser.bodytype=='心' ? (<img src={require('../../statics/images/heart.png')}/>):
                                        (healthUser.bodytype=='肝' ? (<img src={require('../../statics/images/liver.png')}/>):
                                            (healthUser.bodytype=='肾' ? (<img src={require('../../statics/images/kidney.png')}/>):
                                                (healthUser.bodytype=='胃' ? (<img src={require('../../statics/images/stomach.png')}/>):
                                                    (healthUser.bodytype=='脾' ? (<img src={require('../../statics/images/spleen.png')}/>):
                                                        "")))))))}
                        {/*头、肺、胆、心、肝、肾、胃、脾*/}
                        {bloodtype=='A' ? (<img src={require('../../statics/images/A.png')} />):
                            (bloodtype=='B' ? (<img src={require('../../statics/images/B.png')}/>):
                                (bloodtype=='AB' ? (<img src={require('../../statics/images/AB.png')}/>):
                                    (bloodtype=='O' ? (<img src={require('../../statics/images/O.png')}/>):
                                        "")))}
                    </div>
                    <h4>{healthUser.bodytype+bloodtype}体质的你：</h4>
                    <p>{selfintro}</p>
                    <h4>健康指南：</h4>

                    {charactertd && (
                        <div>
                            <h4>* 性格特点：</h4>
                            {charactertd.map((item, index) => <p key={index}>{item}</p>)}
                        </div>
                    )}
                    {bodytypeatten && (
                        <div>
                            <h4>* 体质注意：</h4>
                            {bodytypeatten.map((item, index) => <p key={index}>{item}</p>)}
                        </div>
                    )}
                    {healthWT && (
                        <div>
                            <h4>* 健康问题：</h4>
                            {healthWT.map((item, index) => <p key={index}>{item}</p>)}
                        </div>
                    )}
                    {harmful && (
                        <div>
                            <h4>* 伤害性行为：</h4>
                            {harmful.map((item, index) => <p key={index}>{item}</p>)}
                        </div>
                    )}
                    {healthpoint && (
                        <div>
                            <h4>* 保健穴位：</h4>
                            {healthpoint.map((item, index) => <p key={index}>{item}</p>)}
                        </div>
                    )}
                    <p className={styles.more}>更多{healthUser.bodytype+bloodtype}体质常见疾病、预防措施、病例解析及微课，详见“32体质健康”公众号。欢迎分享给你关心的人，为他们送去一份最简单实用的健康指南。你离健康，其实只差一个小小行为的改变！</p>
                    <div className={styles.other}>
                        <span className={styles.code}>
                            <img src={require('../../statics/images/32_code.jpg')} />
                            <a>长按扫描二维码<br />关注我们</a>
                        </span>
                        <span className={styles.shot}>
                            <img src={require('../../statics/images/shot_img.png')} />
                        </span>
                    </div>
                </div>
                <div className={styles["share-box"]}>
                    <Share />
                </div>
            </div>
        )
    }
}

export default MyHealth
