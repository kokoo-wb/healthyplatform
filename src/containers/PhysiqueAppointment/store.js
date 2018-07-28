import { observable, computed, action, useStrict, runInAction } from 'mobx'
import { asyncAction } from 'mobx-utils'
import React from 'react'
import { Modal } from 'antd-mobile'
import styles from './index.less'

import { appointment, checkpoint } from '../../services'

useStrict(true)

export default class Store {
    @observable isReuqesting = false
    @observable nationalAreaList = []

    @action
    async getCheckpoint(data) {
        this.isReuqesting = true
        try {
            const res = await checkpoint(data)

            runInAction(() => {
                if (res && res.data) {
                    this.nationalAreaList = res.data || []
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
    async submitForm(data) {
        this.isReuqesting = true
        try {
            console.log(data)
            const res = await appointment(data)

            runInAction(() => {
                if (res && res.data) {
                    const successModal = Modal.alert((
                        <div className={styles["success-modal"]}>
                            <img src={require(res.data.code == 20 ? 'public/images/icon_success.png' : 'public/images/error_ico.png')} />
                            <p className={styles["success-tip"]}>{res.data.msg}</p>
                        </div>
                    ), '', [])

                    setTimeout(() => {
                        successModal.close()
                    }, 3000)
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

