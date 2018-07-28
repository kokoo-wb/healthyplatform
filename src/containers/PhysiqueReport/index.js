import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { Icon } from 'antd-mobile'
import { observer } from 'mobx-react'
import moment from 'moment'

// css
import styles from './index.less'

// components
import Share from 'iComponents/Share'

// constants
import Store from './store.js'

import { show_lunar_calendar } from '../../utils/utils'

@observer
class PhysiqueReport extends React.Component {
    static defaultProps = {
        PhysiqueReportStore: Store.PhysiqueReportStore
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }


    render() {
        const { healthGuide,healthUser } = this.props.location.state
        console.log(healthUser)

        return (
            <div className={styles["my-health"]}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{healthUser.bodytype+healthUser.bloodtype}体质</h1>
                    <p className={styles.birthday}><label>您的生日：</label><i>{healthUser.yangbirthday + ' ' + show_lunar_calendar(healthUser.yangbirthday)}<br />{healthUser.yinyear}年 [{healthUser.zodiac}年] {healthUser.yinmonth}月 {healthUser.yinday}日</i></p>
                    <p className={styles["blood-type"]}><label>您的血型：</label><i>{healthUser.bloodtype}型</i></p>
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
                        {healthUser.bloodtype=='A' ? (<img src={require('../../statics/images/A.png')} />):
                            (healthUser.bloodtype=='B' ? (<img src={require('../../statics/images/B.png')}/>):
                                (healthUser.bloodtype=='AB' ? (<img src={require('../../statics/images/AB.png')}/>):
                                    (healthUser.bloodtype=='O' ? (<img src={require('../../statics/images/O.png')}/>):
                                        "")))}

                    </div>

                    <h4>{healthGuide.bodytype+healthGuide.bloodtype}体质的你：</h4>
                    <p>{healthGuide.selfintro}</p>
                    <h4>健康指南：</h4>
                    {/*{healthGuide.sctd ? (<p>* 擅长能力：{healthGuide.sctd}</p>):""}*/}
                    {/*{healthGuide.charactertd ? (<p>* 性格特点：{healthGuide.charactertd}</p>):""}*/}
                    {/*{healthGuide.firstdrug ? (<p>* 优先用药：{healthGuide.firstdrug}</p>):""}*/}
                    {/*{healthGuide.adaptfood ? (<p>* 适宜饮食：{healthGuide.adaptfood}</p>):""}*/}
                    {healthGuide.healthwt ? (<p>* 健康问题：{healthGuide.healthwt}</p>):""}
                    {healthGuide.harmful ? (<p>* 伤害性行为：{healthGuide.harmful}</p>):""}
                    {healthGuide.healthpoint ? (<p>* 保健穴位：{healthGuide.healthpoint}</p>):""}
                    {/*{healthGuide.exercisemode ? (<p>* 事宜的锻炼方式：{healthGuide.exercisemode}</p>):""}*/}
                    <p className={styles.more}>更多{healthGuide.bodytype+healthGuide.bloodtype}体质常见疾病、预防措施、病例解析及微课，详见“32体质健康”公众号。欢迎分享给你关心的人，为他们送去一份最简单实用的健康指南。你离健康，其实只差一个小小行为的改变！</p>
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

export default PhysiqueReport
