import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect, withRouter } from 'react-router-dom'
import { Icon, InputItem, Button, WhiteSpace, WingBlank, Modal } from 'antd-mobile'
import { createForm } from 'rc-form'
import { observer } from 'mobx-react'

// css
import styles from './index.less'

// constants
import Store from './store.js'

@observer
class Login extends React.Component {
    static defaultProps = {
        LoginStore: Store.LoginStore
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    login = () => {
        const fields = this.props.form.getFieldsValue()
        const { phone, password } = fields

        if (phone && phone != '' && password && password != '') {
            this.props.LoginStore.login({
                login_name: phone,
                userpassword: password
            }, this.props.history)
        }
        else {
            const errorModal = Modal.alert((
                <div className={styles["error-modal"]}>
                    <img src={require('public/images/error_ico.png')} />
                    <p>请输入正确的用户名和密码</p>
                </div>
            ), '', [])
    
            setTimeout(() => {
                errorModal.close()
            }, 1500)
        }
    }

    register = () => {
        this.props.history.push('/register')
    }

    forgetPassword = () => {
        this.props.history.push('/forgetpassword')
    }

    render() {
        const { getFieldProps } = this.props.form
        return (
            <div className={styles["login"]}>
                <WingBlank>
                    <div className={styles["login-form"]}>
                        <div className={styles["form-group"]}>
                            <WhiteSpace />
                            <InputItem
                                placeholder="请输入手机号"
                                {...getFieldProps('phone') }
                            >
                            </InputItem>
                            <WhiteSpace />
                            <InputItem
                                placeholder="请输入密码"
                                {...getFieldProps('password') }
                                type='password'
                            ></InputItem>
                            <WhiteSpace />
                        </div>
                        <Button type="primary" onClick={this.login}>登录</Button>
                        <div className={styles["go-register"]}><a onClick={this.register}>注&nbsp;册</a><a style={{marginLeft: 18}} onClick={this.forgetPassword}>忘记密码？</a></div>
                    </div>
                </WingBlank>
            </div>
        )
    }
}

Login = createForm()(Login)

export default withRouter(Login)
