import { observable, computed, action, useStrict, runInAction } from 'mobx'
import { asyncAction } from 'mobx-utils'

import { selfcheck, bodyCheckSum } from '../../services'

useStrict(true)

export default class Store {
    @observable isReuqesting = false
    @observable checkSum = 0

    @action
    async submitForm(data, history) {
        this.isReuqesting = true
        try {
            const res = await selfcheck(data)

            runInAction(() => {
                if (res && res.data) {
                    history.push({ pathname: '/physiquereport', state: res.data });
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
    async bodyCheckSum(data) {
        this.isReuqesting = true
        try {
            const res = await bodyCheckSum(data)
            runInAction(() => {
                if (res && res.data) {
                    this.checkSum = res.data.sum
                }
                this.isReuqesting = false
            })
        } catch (error) {
            runInAction(() => {
                this.isReuqesting = false
            })
        }
    }

    static get PhysiqueCheckStore() {
        return new Store()
    }
}

