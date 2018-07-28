import { observable, computed, action, useStrict, runInAction } from 'mobx'
import { asyncAction } from 'mobx-utils'

import { checkpoint } from '../../services'

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

    static get InitStore() {
        return new Store()
    }
}

