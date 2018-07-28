import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { InputItem, Picker, List, DatePicker, Modal } from 'antd-mobile'
import { createForm } from 'rc-form';
import { observer } from 'mobx-react'

import moment from 'moment'

// css
import styles from './index.less'

// constants
import Store from './store.js'

@observer
class UserInfo extends React.Component {
    static defaultProps = {
        currStore: Store.InitStore
    }

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            date: undefined
        }
    }

    componentWillMount() {
        this.props.currStore.getUserInfo({
            sessionvalue: localStorage.getItem("login_session")
        })
    }

    componentDidMount() {

    }

    submitError = () => {
        const errorModal = Modal.alert((
            <div className={styles["error-modal"]}>
                <img src={require('public/images/error_ico.png')} />
                <p>带“<span>*</span>”项不能为空</p>
            </div>
        ), '', [])

        setTimeout(() => {
            errorModal.close()
        }, 1500)
    }

    onSubmit = () => {
        const { history } = this.props;
        const fields = this.props.form.getFieldsValue()
        const notCheckItem = ['email', 'address']

        for (let item in fields) {
            if (notCheckItem.indexOf(item) < 0 && (!fields[item] || fields[item] == '')) {
                this.submitError();
                return false;
            }
        }

        this.props.currStore.submitForm({
            username: fields.name,
            birthday: moment(fields.birthday).format('YYYY-MM-DD'),
            bloodtype: fields.bloodType.toString(),
            genger: fields.gender.toString(),
            sessionvalue: localStorage.getItem("login_session"),
            yangoryin: this.props.currStore.yangoryin,
            email: fields.email,
            address: fields.address
        })
    }


    render() {
        const { getFieldProps } = this.props.form
        const { userInfo, yangoryin } = this.props.currStore

        const bloodTypeList = [
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
            { label: 'AB', value: 'AB' },
            { label: 'O', value: 'O' },
            { label: '未知', value: '未知' }
        ]

        const genderList = [
            { label: '男', value: '男' },
            { label: '女', value: '女' }
        ]

        const initDate = userInfo.yangbirthday ? new Date(userInfo.yangbirthday) : userInfo.yinbirthday ? new Date(userInfo.yinbirthday) : undefined
        
        return (
            <div>
                <div className={styles["form-group"]}>
                    <InputItem
                        placeholder=""
                        {...getFieldProps('name', {
                            initialValue: userInfo.username
                        }) }
                    >
                        <label className={styles["label-require"]}>姓 名</label>
                    </InputItem>
                </div>

                <div className={styles["form-group"]}>
                    <Picker
                        data={bloodTypeList}
                        cols={1}
                        className="forss"
                        extra=" "
                        {...getFieldProps('bloodType', {
                            initialValue: [userInfo.bloodtype]
                        }) }
                    >
                        <List.Item arrow="horizontal">
                            <span className={styles["label-require"]}>血 型</span>
                        </List.Item>
                    </Picker>

                    <Picker
                        data={genderList}
                        cols={1}
                        className="forss"
                        extra=" "
                        {...getFieldProps('gender', {
                            initialValue: [userInfo.genger]
                        }) }
                    >
                        <List.Item arrow="horizontal">
                            <span className={styles["label-require"]}>性 别</span>
                        </List.Item>
                    </Picker>

                    <div className={styles["birth-time"]}>
                        <DatePicker
                            mode="date"
                            title="选择时间"
                            extra=" "
                            minDate={new Date('1900/01/01')}
                            {...getFieldProps('birthday', {
                                initialValue: initDate
                            }) }
                        >
                            <List.Item arrow="horizontal">
                                <span className={styles["label-require"]}>生 日</span>
                            </List.Item>
                        </DatePicker>
                        <a onClick={this.props.currStore.changeBirthType}>{yangoryin == 'yang' ? '阳历' : '阴历'}</a>
                    </div>
                </div>

                <div className={styles["form-group"]}>
                    <InputItem
                        placeholder=""
                        {...getFieldProps('email', {
                            initialValue: userInfo.email
                        }) }
                    >
                        <label>邮 箱</label>
                    </InputItem>
                    <InputItem
                        placeholder=""
                        {...getFieldProps('address', {
                            initialValue: userInfo.address
                        }) }
                    >
                        <label>地 址</label>
                    </InputItem>
                </div>
                <a className={styles["commit-btn"]} onClick={this.onSubmit}>确认修改</a>
            </div >
        )
    }
}

UserInfo = createForm()(UserInfo)

export default withRouter(UserInfo)
