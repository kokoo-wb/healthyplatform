import { observable, computed, action, useStrict, runInAction } from 'mobx'
import { asyncAction } from 'mobx-utils'
import { Toast,Modal } from 'antd-mobile'
import { setCookie } from '../../utils/utils'
import React from 'react'
import { loginOut, auth } from '../../services'

import styles from './index.less'

useStrict(true)

export default class Store {
    @observable isReuqesting = false
    @observable wechatUserInfo = {}

    @action.bound
    initWechatUserInfo(data) {
        this.wechatUserInfo = data
    }

    @action
    async loginOut(params, history) {
        this.isReuqesting = true
        try {
            const res = await loginOut(params)

            runInAction(() => {
                if (res && res.data) {

                    const successModal = Modal.alert((
                        <div className={styles["success-modal"]}>
                            {/*<img src={require(res.data.code == 20 ? 'public/images/icon_success.png' : 'public/images/error_ico.png')} />*/}
                            <p className={styles["success-tip"]}>{res.data.msg}</p>
                        </div>
                    ), '', [])

                    setTimeout(() => {
                        successModal.close()
                    }, 2000)

                    if (res.data.code == "20") {
                        localStorage.removeItem("login_session")
                        setTimeout(() => {
                            history.push('/login')
                        }, 1000)
                    }
                }
                this.isReuqesting = false
            })
        } catch (error) {
            runInAction(() => {
                this.isReuqesting = false
            })
        }
    }

    @action
    async getWechatUserInfo(params) {
        this.isReuqesting = true
        try {
            const res = await auth(params)

            runInAction(() => {
                if (res && res.data) {
                    this.wechatUserInfo = res.data
                    setCookie('user_openid', res.data.user_openid, 30)
                    setCookie('user_headimgurl', res.data.user_headimgurl, 30)
                    setCookie('user_nickname', res.data.user_nickname, 30)
                }
                this.isReuqesting = false
            })
        } catch (error) {
            runInAction(() => {
                this.isReuqesting = false
            })
        }
    }

    static get PersonalStore() {
        return new Store()
    }
}

