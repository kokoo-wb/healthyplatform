import React from 'react'
import PropTypes from 'prop-types'

// css
import styles from './index.less'

class Share extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    componentDidMount() {

    }

    showShare = () => {
        document.body.style.overflow = 'hidden'
        this.setState({ visible: true })

        setTimeout(() => {
            document.body.style.overflow = 'visible'
            this.setState({ visible: false })
        }, 3000)
    }

    render() {

        return (
            <div>
                {this.state.visible && (
                    <div className={styles["share-box"]}>
                        <img src={require('public/images/zhishi.png')} />
                    </div>
                )}
                <a className={styles["share-btn"]} onClick={this.showShare}>分享给好友检测</a>
            </div>
        )
    }
}

export default Share
