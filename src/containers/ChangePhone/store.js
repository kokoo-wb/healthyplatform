import { observable, computed, action, useStrict, runInAction } from 'mobx'
import { Modal } from 'antd-mobile'
import styles from './index.less'
import { modifyPhone,  getSmsCode } from '../../services'

useStrict(true)

export default class Store {
    @observable isReuqesting = false

    @action
    async modifyPhone(params, history) {
        this.isReuqesting = true
        try {
            const res = await modifyPhone(params)

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
                    }, 2000)

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
                    const successModal = Modal.alert((
                        <div className={styles["success-modal"]}>
                            <img src={require(res.data.code == 20 ? 'public/images/icon_success.png' : 'public/images/error_ico.png')} />
                            <p className={styles["success-tip"]}>{res.data.msg}</p>
                        </div>
                    ), '', [])

                    setTimeout(() => {
                        successModal.close()
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

    static get ChangePhoneStore() {
        return new Store()
    }
}

