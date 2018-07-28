import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { Icon, InputItem, Button, WhiteSpace, WingBlank, Modal } from 'antd-mobile'
import { createForm } from 'rc-form'
import { observer } from 'mobx-react'

// css
import styles from './index.less'

// constants
import Store from './store.js'

@observer
class ChangePhone extends React.Component {
    static defaultProps = {
        ChangePhoneStore: Store.ChangePhoneStore
    }

    constructor(props) {
        super(props)
        this.state = {
            aText: '获取短信验证码',
            disabled: false
        }
    }

    componentDidMount() {

    }

    getCode = () => {
        let { disabled } = this.state

        if(disabled){
            return false
        }

        const fields = this.props.form.getFieldsValue()
        const { phone } = fields

        if (!phone || phone == '') {
            this.handleError('请输入手机号')
            return false
        }

        this.props.ChangePhoneStore.getSmsCode({
            sessionvalue: localStorage.getItem("login_session"),
            phone: phone,
            type:"1"
        })

        this.setState({
            disabled: true
        },this.handleCounter)
    }

    handleCounter = () => {
        let _this = this
        let counter = 60
        
        let timer = setInterval(()=>{
            if(counter==1){
                clearInterval(timer)
                _this.setState({
                    aText: '获取短信验证码',
                    disabled: false
                }) 
            }else{
                --counter
                _this.setState({
                    aText: counter + '秒后重新获取'
                }) 
            }
        },1000)
    }

    handleError = (msg) => {
        const errorModal = Modal.alert((
            <div className={styles["error-modal"]}>
                <img src={require('public/images/error_ico.png')} />
                <p>{msg}</p>
            </div>
        ), '', [])

        setTimeout(() => {
            errorModal.close()
        }, 1500)
    }

    modifyPhone = () => {
        const fields = this.props.form.getFieldsValue()
        const { phone, password, smsCode } = fields

        if (!phone || phone == '') {
            this.handleError('请输入新手机号')
            return false
        }

        if (!smsCode || smsCode == '') {
            this.handleError('请输入短信验证码')
            return false
        }

        if (!password || password == '') {
            this.handleError('请输入密码')
            return false
        }

        this.props.ChangePhoneStore.modifyPhone({
            sessionvalue: localStorage.getItem("login_session"),
            newphone:phone,
            userpassword: password,
            code: smsCode
        }, this.props.history)
    }

    render() {
        const { getFieldProps } = this.props.form
        const { aText, disabled } = this.state

        return (
            <div className={styles["change-phone"]}>
                <WingBlank>
                    <div className={styles["change-phone-form"]}>
                        <div className={styles["form-group"]}>
                            <WhiteSpace />
                            <InputItem
                                placeholder="手机号码"
                                {...getFieldProps('phone') }
                            >
                            </InputItem>
                            {/* <WhiteSpace /> */}
                            {/* <InputItem
                                placeholder="图形验证码"
                                {...getFieldProps('imgCode') }
                                extra={<img className={styles["img-code"]} src={require('../../statics/images/img_code.png')} />}
                            ></InputItem> */}
                            <WhiteSpace />
                            <InputItem
                                placeholder="短信验证码"
                                {...getFieldProps('smsCode') }
                                extra={<a style={{color: disabled?'#a9a9a9':'#666'}} onClick={this.getCode}>{aText}</a>}
                            >
                            </InputItem>
                            <WhiteSpace />
                            <InputItem
                                placeholder="密码"
                                {...getFieldProps('password') }
                                type="password"
                            >
                            </InputItem>
                            <WhiteSpace />
                        </div>
                        <Button type="primary" onClick={this.modifyPhone}>修改</Button>
                    </div>
                </WingBlank>
            </div>
        )
    }
}

ChangePhone = createForm()(ChangePhone)

export default ChangePhone
