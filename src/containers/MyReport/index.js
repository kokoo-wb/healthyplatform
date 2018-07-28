import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { Icon } from 'antd-mobile'
import { observer } from 'mobx-react'
import { show_lunar_calendar } from '../../utils/utils'
// css
import styles from './index.less'

// constants
import Store from './store.js'

@observer
class MyReport extends React.Component {
    static defaultProps = {
        MyReportStore: Store.MyReportStore
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if(!localStorage.getItem('login_session')){
            this.props.history.push('/login')
            return false
        }
        this.props.MyReportStore.getMyReport({
            sessionvalue: localStorage.getItem("login_session")
        })
    }

    componentDidMount() {

    }

    render() {
        const {healthGuide,healthUser } = this.props.MyReportStore
        console.log(healthGuide)
        console.log(healthUser)
        return (
            <div className={styles["my-report"]}>
                <div className={styles.header}>

                    <div className={styles["report-left"]}>
                        <p className={styles["report-detail-one"]}><label>{healthUser.code} </label><i>- {healthUser.bodytype+healthUser.bloodtype}体质</i></p>
                        <p className={styles["report-detail-two"]}><label>生日：</label><i>{healthUser.yangbirthday? healthUser.yangbirthday + ' ' + show_lunar_calendar(healthUser.yangbirthday) : ''}</i></p>
                        <p className={styles["report-detail-three"]}>{healthUser.yinyear}年 [{healthUser.zodiac}年] {healthUser.yinmonth}月 {healthUser.yinday}日</p>
                    </div>
                    <div className={styles["report-right"]}>
                        <p className={styles["report-detail-four"]}><label>弱脏：</label><i>肾/脾</i></p>
                        <p className={styles["report-detail-five"]}><label>血型：</label><i>{healthUser.bloodtype}</i></p>
                        <p className={styles["report-detail-six"]}><label>性别：</label><i>{healthUser.genger}</i></p>
                    </div>
                </div>
                <div className={styles["report-list"]}>
                    {/*<div className={styles["list-item"]}>*/}
                        {/*<p><label>高峰</label><i>*1</i></p>*/}
                        {/*<p><label>检测时间：2018-03-17</label><Icon type="right" style={{color: '#7FC8E2'}}/></p>*/}
                    {/*</div>*/}
                    {/*<div className={styles["list-item"]}>*/}
                        {/*<p><label>邓笑笑（媳妇）</label><i>*2</i></p>*/}
                        {/*<p><label>检测时间：2018-03-17</label><Icon type="right" style={{color: '#7FC8E2'}}/></p>*/}
                    {/*</div>*/}
                    {/*<div className={styles["list-item"]}>*/}
                        {/*<p><label>高成林（叔叔）</label><i>*3</i></p>*/}
                        {/*<p><label>检测时间：2018-03-17</label><Icon type="right" style={{color: '#7FC8E2'}}/></p>*/}
                    {/*</div>*/}
                    {/*<div className={styles["list-item"]}>*/}
                        {/*<p><label>高成双（大伯）</label><i>*4</i></p>*/}
                        {/*<p><label>检测时间：2018-03-17</label><Icon type="right" style={{color: '#7FC8E2'}}/></p>*/}
                    {/*</div>*/}
                    <div className={styles["report-empty-list"]}>
                        暂无报告
                    </div>
                </div>
            </div>
        )
    }
}

export default MyReport
