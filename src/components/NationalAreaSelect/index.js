import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Icon } from 'antd-mobile'

// css
import styles from './index.less'

class NationAreaSelect extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checkItem: {},
            visible: false
        }
    }

    componentDidMount() {

    }

    showCheckModal = () => {
        this.setState({ visible: true })
    }

    hideCheckModal = () => {
        this.setState({ visible: false })
    }

    checkItems = (currItem) => {
        this.setState({
            checkItem: currItem,
            visible: false
        }, () => {
            this.props.onFinish(currItem)
        })
    }

    render() {
        const { data = [], children } = this.props

        return (
            <div className={styles["national-area-select"]}>
                {this.state.visible && (
                    <Modal
                        visible={this.state.visible}
                        className={styles["select-modal"]}
                    >
                        <div className={styles["select-area"]}>
                            <ul className={styles["national-area-list"]}>
                                {data.map((item, index) => (
                                    <li key={index} onClick={() => this.checkItems(item)}>
                                        <p>{item.city}</p>
                                        <p>地址：{item.address}</p>
                                        <p>电话：{item.phone}</p>
                                    </li>
                                ))}
                            </ul>

                            <a className={styles["cancel-btn"]} onClick={this.hideCheckModal}>取消</a>
                        </div>
                    </Modal>
                )}

                <div className="select-box" onClick={this.showCheckModal}>
                    <div>{children}</div>
                    <p className="select-value">{this.state.checkItem.address}</p>
                    <i className="select-ico-arrow"></i>
                </div>
            </div>
        )
    }
}

export default NationAreaSelect
