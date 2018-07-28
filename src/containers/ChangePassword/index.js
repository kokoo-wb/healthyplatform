import React from 'react'
import { Icon, InputItem, Button, WhiteSpace, WingBlank, Modal } from 'antd-mobile'
import { createForm } from 'rc-form'
import { observer } from 'mobx-react'

// css
import styles from './index.less'

// constants
import Store from './store.js'
@observer
class ChangePassword extends React.Component {
    static defaultProps = {
        ChangePasswordStore: Store.ChangePasswordStore
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

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

    register = () => {
        const fields = this.props.form.getFieldsValue()
        const { oldPassword, newPassword, comfirmPassword } = fields

        if (!oldPassword || oldPassword == '') {
            this.handleError('请输入旧密码')
            return false
        }

        if (!newPassword || newPassword == '') {
            this.handleError('请输入新密码')
            return false
        }

        if (!comfirmPassword || comfirmPassword == '') {
            this.handleError('请输入确认密码')
            return false
        }

        if(newPassword != comfirmPassword){
            this.handleError('确认密码与新密码不匹配')
            return false
        }

        this.props.ChangePasswordStore.changePwd({
            sessionvalue: localStorage.getItem("login_session"),
            newuserpassword: newPassword,
            olduserpassword: oldPassword
        }, this.props.history)
    }

    render() {
        const { getFieldProps } = this.props.form

        return (
            <div className={styles["change-password"]}>
                <WingBlank>
                    <div className={styles["change-password-form"]}>
                        <div className={styles["form-group"]}>
                            <WhiteSpace />
                            <InputItem
                                placeholder="旧密码"
                                {...getFieldProps('oldPassword') }
                                type="password"
                            >
                            </InputItem>
                            <WhiteSpace />
                            <InputItem
                                placeholder="新密码"
                                {...getFieldProps('newPassword') }
                                type="password"
                            >
                            </InputItem>
                            <WhiteSpace />
                            <InputItem
                                placeholder="确认密码"
                                {...getFieldProps('comfirmPassword') }
                                type="password"
                            >
                            </InputItem>
                            <WhiteSpace />
                        </div>
                        <Button type="primary" onClick={this.register}>修改</Button>
                    </div>
                </WingBlank>
            </div>
        )
    }
}

ChangePassword = createForm()(ChangePassword)

export default ChangePassword
