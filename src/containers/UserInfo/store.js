import { observable, computed, action, useStrict, runInAction } from 'mobx'
import { Modal } from 'antd-mobile'

import { updateUserInfo, getUserInfo } from '../../services'
import React from 'react'
import styles from './index.less'

useStrict(true)

export default class Store {
    @observable isReuqesting = false
    @observable userInfo = {}
    @observable yangoryin = 'yang'

    @action.bound
    changeBirthType() {
        this.yangoryin = this.yangoryin == 'yang' ? 'yin' : 'yang'
    }

    @action
    async submitForm(data) {
        this.isReuqesting = true
        try {
            console.log(data)
            const res = await updateUserInfo(data)

            runInAction(() => {

                const successModal = Modal.alert((
                    <div className={styles["success-modal"]}>
                        <img src={require(res.data.code == 20 ? 'public/images/icon_success.png' : 'public/images/error_ico.png')} />
                        <p className={styles["success-tip"]}>{res.data.msg}</p>
                    </div>
                ), '', [])

                setTimeout(() => {
                    successModal.close()
                }, 2000)

                if(res.data.code == "20"){
                    setTimeout(() => {
                        history.push('/personal')
                    }, 2000)
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
    async getUserInfo(params) {
        this.isReuqesting = true
        try {
            const res = await getUserInfo(params)

            runInAction(() => {
                if (res && res.data) {
                    this.userInfo = res.data.healthUser || {}
                    if (res.data.healthUser && res.data.healthUser.yangbirthday) {
                        this.yangoryin = 'yang'
                    }
                    else {
                        this.yangoryin = 'yin'
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

    static get InitStore() {
        return new Store()
    }
}

