import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { InputItem, Picker, List, DatePicker, Modal } from 'antd-mobile'
import { createForm } from 'rc-form';
import { observer } from 'mobx-react'

import moment from 'moment'

// css
import styles from './index.less'

// components
import Share from 'iComponents/Share'

// constants
import Store from './store.js'

@observer
class PhysiqueCheck extends React.Component {
    static defaultProps = {
        PhysiqueCheckStore: Store.PhysiqueCheckStore
    }

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            date: undefined,
            yangoryin: 'yin'
        }
    }

    componentWillMount() {
        this.props.PhysiqueCheckStore.bodyCheckSum({
            aa:"aa"
        })
    }

    componentDidMount() {

    }

    changeBirthType = () => {
        const timeType = this.state.yangoryin == 'yang' ? 'yin' : 'yang'
        this.setState(Object.assign({}, this.state, { yangoryin: timeType }))
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

        for (let item in fields) {
            if (!fields[item] || fields[item] == '') {
                this.submitError();
                return false;
            }
        }

        this.props.PhysiqueCheckStore.submitForm({
            name: fields.name,
            birthday: moment(fields.birthday).format('YYYY-MM-DD'),
            bloodtype: fields.bloodType ? fields.bloodType.toString() : '',
            genger: fields.gender ? fields.gender.toString() : '',
            sessionvalue: localStorage.getItem("loginSession"),
            yangoryin: this.state.yangoryin
        }, history)
    }


    render() {
        const { getFieldProps } = this.props.form
        const {healthGuide,healthUser,weakdirty,bloodtype} = this.props.PhysiqueCheckStore.checkSum
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

        return (
            <div>
                <h2 className={styles["title"]}>现在已有{this.props.PhysiqueCheckStore.checkSum}位参加体质检测</h2>
                <p className={styles["desc"]}>输入姓名、生日、血型和性别，即可了解自己的体质，并且免费获得一份健康指南，你离健康，其实只差一个小小的行为改变。</p>
                <div className={styles["selfcheck-content"]}>
                    <div className={styles["selfcheck-form"]}>
                        <div className={styles["form-group"]}>
                            <InputItem
                                placeholder=""
                                {...getFieldProps('name') }
                            >
                                <label className={styles["label-require"]}>姓名</label>
                            </InputItem>

                            <div className={styles["birth-time"]}>
                                <DatePicker
                                    {...getFieldProps('birthday') }
                                    mode="date"
                                    title="选择时间"
                                    extra=" "
                                    minDate={new Date('1900/01/01')}
                                >
                                    <List.Item arrow="horizontal">
                                        <span className={styles["label-require"]}>生日</span>
                                    </List.Item>
                                </DatePicker>
                                <a onClick={this.changeBirthType} className={this.state.yangoryin == 'yin' ? styles["yin"] : ''}>{this.state.yangoryin == 'yang' ? '阳历' : '阴历'}</a>
                            </div>

                            <Picker data={bloodTypeList} cols={1} {...getFieldProps('bloodType') } className="forss" extra=" ">
                                <List.Item arrow="horizontal">
                                    <span className={styles["label-require"]}>血型</span>
                                </List.Item>
                            </Picker>

                            <Picker data={genderList} cols={1} {...getFieldProps('gender') } className="forss" extra=" ">
                                <List.Item arrow="horizontal">
                                    <span className={styles["label-require"]}>性别</span>
                                </List.Item>
                            </Picker>
                        </div>

                        <p className={styles["tip"]}>注：生日务必填写正确!</p>
                    </div>
                </div>
                <p className={styles["question"]}>
                    <NavLink exact to='/physiquetypedesc'>什么是32体质？</NavLink>
                </p>
                <a className={styles["selfcheck-btn"]} onClick={this.onSubmit}></a>
                <Share />
            </div>
        )
    }
}

PhysiqueCheck = createForm()(PhysiqueCheck)

export default withRouter(PhysiqueCheck)
