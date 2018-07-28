import { observable, computed, action, useStrict, runInAction } from 'mobx'
import { asyncAction } from 'mobx-utils'

useStrict(true)

export default class Store {
    @observable isReuqesting = false
    @observable count = 0

    @action.bound
    addCount() {
        this.count = this.count + 1;
    }

    // @action
    // async getSomeListList() {
    //     this.isReuqesting = true
    //     try {
    //         const res = await getSomething({})
    //         console.log(res)

    //         runInAction(() => {
    //             if (res && res.data) {                    
    //             }
    //             this.isReuqesting = false
    //         })
    //     } catch (error) {
    //         runInAction(() => {
    //             this.isReuqesting = false
    //         })
    //     }
    // }

    static get DemoStore() {
        return new Store()
    }
}

