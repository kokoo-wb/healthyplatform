import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Icon } from 'antd-mobile'

// css
import styles from './index.less'

class Select extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checkList: [],
            checkLabels: '',
            visible: false
        }
    }

    componentDidMount() {

    }

    showCheckModal = () => {
        console.log(this.props.value)
        this.setState({ visible: true, checkList: this.props.value })
    }

    hideCheckModal = () => {
        this.setState({ visible: false })
    }

    checkItems = (currItem) => {
        let checkArr = [].concat(this.state.checkList)
        checkArr = checkArr.filter(item => item.value != currItem.value)
        if (checkArr.length == this.state.checkList.length) {
            checkArr.push(currItem)
        }

        this.setState({
            checkList: checkArr
        })
    }

    finishCheck = () => {
        const checkList = this.state.checkList
        const labels = this.state.checkList.map(item => item.label).join(' ')
        this.setState({ visible: false, checkLabels: labels }, () => {
            this.props.onFinish(checkList)
        })
    }

    render() {
        const { data = [], children } = this.props

        return (
            <div>
                {this.state.visible && (
                    <Modal
                        visible={this.state.visible}
                        className={styles["select-modal"]}
                    >
                        <ul>
                            {
                                data.map((item, index) => {
                                    const dataValueList = this.state.checkList.map(itemin => itemin.value)
                                    return (
                                        < li key={index} onClick={() => this.checkItems(item)}>
                                            <span>{item.label}</span>
                                            {dataValueList.indexOf(item.value) >= 0 && (
                                                <Icon type="check" className={styles["check-ico"]} />
                                            )}
                                        </li>
                                    )

                                })
                            }
                        </ul>
                        <div className={styles["button-box"]}>
                            <span onClick={this.hideCheckModal}>取消</span>
                            <span onClick={this.finishCheck}>完成</span>
                        </div>
                    </Modal>
                )}

                <div className="select-box" onClick={this.showCheckModal}>
                    <div>{children}</div>
                    <p className="select-value">{this.state.checkLabels}</p>
                    <i className="select-ico-arrow"></i>
                </div>
            </div>
        )
    }
}

export default Select
