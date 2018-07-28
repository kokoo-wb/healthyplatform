import React from 'react'
import PropTypes from 'prop-types'

// css
import styles from './index.less'

class Attention extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className={styles["attention-box"]}>
                <p>100000+人已关注加入我们</p>
                <div className={styles["img-box"]}>
                    <img src={require('public/images/head_one.png')} />
                    <img src={require('public/images/head_two.png')} />
                    <img src={require('public/images/head_three.png')} />
                    <img src={require('public/images/head_four.png')} />
                    <img src={require('public/images/head_five.png')} />
                    <img src={require('public/images/head_six.png')} />
                    <img src={require('public/images/head_seven.png')} />
                    <img src={require('public/images/head_eight.png')} />
                    <img src={require('public/images/head_nine.png')} />
                    <img src={require('public/images/head_ten.png')} />
                    <img src={require('public/images/head_eleven.png')} />
                    <img src={require('public/images/head_twelve.png')} />
                    <img src={require('public/images/head_thirteen.png')} />
                    <img src={require('public/images/head_fourteen.png')} />
                    <img src={require('public/images/head_fifteen.png')} />
                    <img src={require('public/images/chat_01.png')} />
                </div>
            </div>
        )
    }
}

export default Attention
