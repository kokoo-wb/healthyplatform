import { observable, computed, action, useStrict, runInAction } from 'mobx'
import { asyncAction } from 'mobx-utils'

useStrict(true)

export default class Store {

    static get ReportDetailStore() {
        return new Store()
    }
}

