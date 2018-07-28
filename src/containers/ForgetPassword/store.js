import { observable, computed, action, useStrict, runInAction } from 'mobx'
import { Toast } from 'antd-mobile'

import { forgetPwd,  getSmsCode } from '../../services'

useStrict(true)

export default class Store {
    @observable isReuqesting = false

    @action
    async forgetPwd(params, history) {
        this.isReuqesting = true
        try {
            const res = await forgetPwd(params)

            runInAction(() => {
                if (res && res.data) {
                    Toast.info(res.data.msg, 2)
                    if(res.data.code == "20"){
                        setTimeout(() => {
                            history.push('/login')
                        }, 2000)
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
    async getSmsCode(data) {
        this.isReuqesting = true
        try {
            const res = await getSmsCode(data)
            runInAction(() => {
                if (res && res.data) {
                    Toast.info(res.data.msg, 2)
                }
                this.isReuqesting = false
            })
        } catch (error) {
            runInAction(() => {
                this.isReuqesting = false
            })
        }
    }

    static get ForgetPasswordStore() {
        return new Store()
    }
}

