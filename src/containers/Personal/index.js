import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect, withRouter } from 'react-router-dom'
import { Grid, List, Icon } from 'antd-mobile'
const Item = List.Item
import { observer } from 'mobx-react'
import { getUrlParms, getCookie } from '../../utils/utils'

// css
import styles from './index.less'

// constants
import Store from './store.js'

@observer
class Personal extends React.Component {
    static defaultProps = {
        PersonalStore: Store.PersonalStore
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if(!localStorage.getItem('login_session')){
            this.props.history.push('/login')
        }

        if (!getCookie('user_openid')) {
            if (getUrlParms('code')) {
                this.props.PersonalStore.getWechatUserInfo({
                    code: getUrlParms('code')
                })
            }
            else {
                var REDIRECT_URI = encodeURIComponent(window.location.href.split('?')[0])
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcd8e6f2aa0579607&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
            }
        }
        else {
            this.props.PersonalStore.initWechatUserInfo({
                user_nickname: getCookie('user_nickname'),
                user_headimgurl: getCookie('user_headimgurl'),
                user_openid: getCookie('user_openid')
            })
        }
    }

    componentDidMount() {

    }

    handleLogout = () => {
        this.props.PersonalStore.loginOut({
            sessionvalue: localStorage.getItem("loginSession")
        }, this.props.history)
    }

    handleClick = () => (el, index) => {
        if (index == 5) {
            this.props.PersonalStore.loginOut({
                sessionvalue: localStorage.getItem("loginSession")
            }, this.props.history)
        } else {
            if (el.url) {
                window.location.href = el.url
            }
            else {
                this.props.history.push(`/${el.route}`)
            }
        }
    }

    render() {
        const { wechatUserInfo } = this.props.PersonalStore

        const data = [
            {
                icon: require('../../statics/images/personal_one.png'),
                text: <span style={{ color: '#666B74' }}>我的报告</span>,
                route: 'myreport',
                url: 'http://jsr001.4dmra.cn/newphp/e/DoInfo/32-login.php'
            },
            {
                icon: require('../../statics/images/personal_two.png'),
                text: <span style={{ color: '#666B74' }}>我的体质</span>,
                route: 'myhealth'
            },
            {
                icon: require('../../statics/images/personal_three.png'),
                text: <span style={{ color: '#666B74' }}>饮食建议</span>,
                route: 'dietsuggest'
            },
            {
                icon: require('../../statics/images/personal_four.png'),
                text: <span style={{ color: '#666B74' }}>意见反馈</span>,
                route: 'myreport'
            },
            {
                icon: require('../../statics/images/logo_32.png'),
                text: <span style={{ color: '#666B74' }}>关于32体质</span>,
                route: 'physiquetype'
            },
            {
                icon: require('../../statics/images/personal_six.png'),
                text: <span style={{ color: '#666B74' }}>退出</span>,
                route: 'myreport'
            }
        ]

        return (
            <div className={styles.personal}>
                <div className={styles.header}>
                    <span><img src={wechatUserInfo.user_headimgurl} />{wechatUserInfo.user_nickname}</span>
                    {/*<span>186****0612</span>*/}
                </div>
                <div className={styles.list}>
                    <List>
                        <Item
                        arrow="horizontal"
                        thumb={require('../../statics/images/personal_icon.png')}
                        multipleLine
                        onClick={() => {this.props.history.push('/userinfo')}}
                        >
                            个人信息
                        </Item>
                        <Item
                        arrow="horizontal"
                        thumb={require('../../statics/images/phone_icon.png')}
                        multipleLine
                        onClick={() => {this.props.history.push('/changephone')}}
                        >
                            修改手机号
                        </Item>
                        <Item
                        arrow="horizontal"
                        thumb={require('../../statics/images/lock_icon.png')}
                        multipleLine
                        onClick={() => {this.props.history.push('/changepassword')}}
                        >
                            修改密码
                        </Item>
                        <Item
                        arrow="horizontal"
                        thumb={require('../../statics/images/exit_icon.png')}
                        multipleLine
                        onClick={this.handleLogout}
                        >
                            退出
                        </Item>
                    </List>
                </div>
                {/* <Grid data={data} columnNum={3} onClick={this.handleClick()} /> */}
            </div>
        )
    }
}

export default withRouter(Personal)
