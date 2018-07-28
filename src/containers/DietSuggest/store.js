import { observable, computed, action, useStrict, runInAction } from 'mobx'
import { asyncAction } from 'mobx-utils'
import { Toast } from 'antd-mobile'

import { foodAdvice } from '../../services'

useStrict(true)

export default class Store {
    @observable isReuqesting = false
    // @observable healthBody = {}
    @observable healthUser = {}
    @observable weakdirty = ""
    @observable bloodtype = ""
    @observable ivoid = []
    @observable dietprin = []
    @observable goodfood = []
    @observable healthcare = []

    @action
    async getSuggestInfo(params,history) {
        this.isReuqesting = true
        try {
            const res = await foodAdvice(params)
            console.log(res)
            runInAction(() => {
                if (res && res.data) {
                    if(res.data.code == "20"){
                        this.ivoid = res.data.ivoid
                        this.healthUser = res.data.healthUser
                        this.weakdirty = res.data.weakdirty
                        this.bloodtype = res.data.bloodtype
                        this.dietprin = res.data.dietprin
                        this.goodfood = res.data.goodfood
                        this.healthcare = res.data.healthcare
                    }else{
                        Toast.info(res.data.msg, 2)
                        setTimeout(() => {
                            history.push('/userinfo')
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

    static get DietSuggestStore() {
        return new Store()
    }
}

