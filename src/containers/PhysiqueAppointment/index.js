import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { InputItem, Picker, List, DatePicker, Toast, Modal, Icon } from 'antd-mobile'
import { createForm } from 'rc-form'
import { observer } from 'mobx-react'
import moment from 'moment'

// css
import styles from './index.less'

// components
import NationalAreaSelect from 'iComponents/NationalAreaSelect'
import Select from 'iComponents/Select'

// constants
import Store from './store.js'

@observer
class PhysiqueAppointment extends React.Component {
    static defaultProps = {
        currStore: Store.InitStore
    }

    constructor(props) {
        super(props)
        this.state = {
            otherSick: '',
            checkArea: {},
            checkHereditySickList: [],
            checkSurgeryList: [],
            yangoryin: 'yin'
        }
    }

    componentDidMount() {
        this.props.currStore.getCheckpoint(
            {aa : "aa"}
        )
    }

    selectArea = (item) => {
        this.setState(Object.assign({}, this.state, { checkArea: item }))
    }

    changeHereditySick = (list) => {
        this.setState(Object.assign({}, this.state, { checkHereditySickList: list }))
    }

    changeSurgery = (list) => {
        this.setState(Object.assign({}, this.state, { checkSurgeryList: list }))
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
        const fields = this.props.form.getFieldsValue()
        const notCheckItem = ['idcard', 'hereditySick', 'surgery', 'otherSick']

        for (let item in fields) {
            if (notCheckItem.indexOf(item) < 0 && (!fields[item] || fields[item] == '')) {
                this.submitError();
                return false;
            }
        }

        if (!this.state.checkArea.address) {
            this.submitError();
            return false;
        }

        const params = {
            name: fields.name,
            birthday: moment(fields.birthday).format('YYYY-MM-DD'),
            bloodtype: fields.bloodType ? fields.bloodType.toString() : '',
            genger: fields.gender ? fields.gender.toString() : '',
            phone: fields.phone,
            idnum: fields.idcard,
            checkpoint: this.state.checkArea.address,
            checkdate: moment(fields.appintDate).format('YYYY-MM-DD hh:mm'),
            historymedical: this.state.checkHereditySickList.join(','),
            bigoperator: this.state.checkSurgeryList.join(','),
            othermedical: this.state.otherSick,
            yangoryin: this.state.yangoryin
        }

        console.log(params)
        this.props.currStore.submitForm(params)
    }


    render() {
        const { getFieldProps } = this.props.form

        const { nationalAreaList } = this.props.currStore

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

        const checkAreaList = [
            { label: '检测点一', value: '1' },
            { label: '检测点二', value: '2' },
            { label: '检测点三', value: '3' }
        ]


        const hereditySickList = [
            { label: '先天性肌强直', value: '先天性肌强直' },
            { label: '软骨营养不良', value: '软骨营养不良' },
            { label: '遗传性神经性耳聋', value: '遗传性神经性耳聋' },
            { label: '多指(趾)', value: '多指(趾)' },
            { label: '神经纤维瘤', value: '神经纤维瘤' },
            { label: '马凡氏综合征等 ', value: '马凡氏综合征等' },
            { label: '地中海型贫血', value: '地中海型贫血' },
            { label: '白化症', value: '白化症' },
            { label: '先天性肌弛缓', value: '先天性肌弛缓' },
            { label: '先天性聋哑', value: '先天性聋哑' }
        ]

        const surgeryList = [
            { label: '肾摘除者', value: '肾摘除者' },
            { label: '肝脏手术者', value: '肝脏手术者' },
            { label: '胆囊切除者', value: '胆囊切除者' },
            { label: '胃部切除者', value: '胃部切除者' },
            { label: '肺叶切除者', value: '肺叶切除者' },
            { label: '脾脏切除者', value: '脾脏切除者' },
            { label: '胰脏切除者', value: '胰脏切除者' }
        ]

        return (
            <div className={styles["container"]}>
                <div className={styles["appointment-content"]}>
                    <div className={styles["appointment-form"]}>
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

                        <div className={styles["form-group"]}>
                            <InputItem
                                type="phone"
                                placeholder=""
                                {...getFieldProps('phone') }
                            >
                                <label className={styles["label-require"]}>手机号</label>
                            </InputItem>

                            <InputItem
                                placeholder=""
                                {...getFieldProps('idcard') }
                            >
                                <label>身份证号</label>
                            </InputItem>

                            <NationalAreaSelect
                                data={nationalAreaList}
                                onFinish={this.selectArea}
                            >
                                <label className={styles["label-require"]}>检测点</label>
                            </NationalAreaSelect>

                            <div className={styles["appointment-time"]}>
                                <DatePicker
                                    {...getFieldProps('appintDate') }
                                    title="选择时间"
                                    minuteStep={30}
                                    extra=" "
                                >
                                    <List.Item arrow="horizontal">
                                        <span className={styles["label-require"]}>预约时间</span>
                                    </List.Item>
                                </DatePicker>
                            </div>
                        </div>

                        <div className={styles["form-group"]}>
                            <Select
                                data={hereditySickList}
                                value={this.state.checkHereditySickList}
                                onFinish={this.changeHereditySick}
                            >
                                <label>家族遗传病史</label>
                            </Select>

                            <Select
                                data={surgeryList}
                                value={this.state.checkSurgeryList}
                                onFinish={this.changeSurgery}
                            >
                                <label>重大手术</label>
                            </Select>


                            <div className={styles["textarea-box"]}>
                                <div className={styles["textarea-label"]}>其他病情</div>
                                <textarea></textarea>
                            </div>
                        </div>

                        <p className={styles["tip"]}>注：姓名、生日、血型、手机号、身份证号务必填写正确</p>
                    </div>
                </div>

                <a className={styles["appointment-btn"]} onClick={this.onSubmit}></a>
            </div>
        )
    }
}

PhysiqueAppointment = createForm()(PhysiqueAppointment)

export default PhysiqueAppointment
