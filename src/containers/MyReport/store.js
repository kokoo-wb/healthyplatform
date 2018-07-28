import { observable, computed, action, useStrict, runInAction } from 'mobx'
import { asyncAction } from 'mobx-utils'
import {Toast} from "antd-mobile/lib/index";
import {selfcheck} from "../../services";

useStrict(true)

export default class Store {

    @observable isReuqesting = false
    @observable healthGuide = {}
    @observable healthUser = {}

    @action
    async getMyReport(params) {
        this.isReuqesting = true
        try {
            const res = await selfcheck(params)
            runInAction(() => {
                if (res && res.data) {
                    this.healthGuide = res.data.healthGuide
                    this.healthUser = res.data.healthUser
                }
                this.isReuqesting = false
            })
        } catch (error) {
            runInAction(() => {
                this.isReuqesting = false
            })
        }
    }


    static get MyReportStore() {
        return new Store()
    }
}

