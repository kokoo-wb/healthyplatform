import { observable, computed, action, useStrict, runInAction } from 'mobx'
import {selfcheck} from "../../services";
useStrict(true)
import { Toast } from 'antd-mobile'


export default class Store {

    @observable isReuqesting = false
    @observable healthUser = {}
    @observable weakdirty = ""
    @observable bloodtype = ""
    @observable harmful = ""
    @observable healthpoint = ""
    @observable selfintro = ""
    @observable healthWT = ""
    @observable charactertd = ""
    @observable bodytypeatten = ""




    @action
    async getMyHealth(params,history) {
        this.isReuqesting = true
        try {
            console.log(params)
            const res = await selfcheck(params)
            runInAction(() => {
                if (res && res.data) {
                    if(res.data.code == "20") {
                        this.healthGuide = res.data.healthGuide
                        this.healthUser = res.data.healthUser
                        this.weakdirty = res.data.weakdirty
                        this.bloodtype = res.data.bloodtype
                        this.harmful = res.data.harmful
                        this.healthpoint = res.data.healthpoint
                        this.selfintro = res.data.selfintro
                        this.healthWT = res.data.healthWT
                        this.charactertd = res.data.charactertd
                        this.bodytypeatten = res.data.bodytypeatten
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


    static get MyHealthStore() {
        return new Store()
    }
}

