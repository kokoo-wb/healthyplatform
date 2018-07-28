import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { Tabs } from 'antd-mobile'
const TabPane = Tabs.TabPane
import { observer } from 'mobx-react'

// css
import styles from './index.less'

// constants
import Store from './store.js'

@observer
class Knowledge extends React.Component {
    static defaultProps = {
        KnowledgeStore: Store.KnowledgeStore
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        const tabs = [
            { title: '血型库' },
            { title: '病历库' }
        ];
        return (
            <div className={styles.knowledge}>
                <div className={styles.banner}><img src={require('../../statics/images/banner.png')} alt="banner"/></div>
                <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false} tabBarUnderlineStyle={{borderColor: '#F5A623'}} tabBarActiveTextColor={'#F5A623'} tabBarInactiveTextColor={'#666B74'}>
                    <div className={styles["tab-content"]}>
                        <ul>
                            <li>
                                <span>
                                    <p>自愈力之-O型血饮食/运动/用药健康指南 </p>
                                    <i>你知道不同血型的人群出现的时间、地域是完…</i>
                                </span>
                                <img src={require('../../statics/images/knowledge.png')} />
                            </li>
                            <li>
                                <span>
                                    <p>自愈力之-O型血饮食/运动/用药健康指南 </p>
                                    <i>你知道不同血型的人群出现的时间、地域是完…</i>
                                </span>
                                <img src={require('../../statics/images/knowledge.png')} />
                            </li>
                            <li>
                                <span>
                                    <p>自愈力之-O型血饮食/运动/用药健康指南 </p>
                                    <i>你知道不同血型的人群出现的时间、地域是完…</i>
                                </span>
                                <img src={require('../../statics/images/knowledge.png')} />
                            </li>
                            <li>
                                <span>
                                    <p>自愈力之-O型血饮食/运动/用药健康指南 </p>
                                    <i>你知道不同血型的人群出现的时间、地域是完…</i>
                                </span>
                                <img src={require('../../statics/images/knowledge.png')} />
                            </li>
                            <li>
                                <span>
                                    <p>自愈力之-O型血饮食/运动/用药健康指南 </p>
                                    <i>你知道不同血型的人群出现的时间、地域是完…</i>
                                </span>
                                <img src={require('../../statics/images/knowledge.png')} />
                            </li>
                        </ul>
                    </div>
                    <div className={styles["tab-content"]}>
                        <ul>
                            <li>
                                <span>
                                    <p>自愈力之-O型血饮食/运动/用药健康指南 </p>
                                    <i>你知道不同血型的人群出现的时间、地域是完…</i>
                                </span>
                                <img src={require('../../statics/images/knowledge.png')} />
                            </li>
                            <li>
                                <span>
                                    <p>自愈力之-O型血饮食/运动/用药健康指南 </p>
                                    <i>你知道不同血型的人群出现的时间、地域是完…</i>
                                </span>
                                <img src={require('../../statics/images/knowledge.png')} />
                            </li>
                            <li>
                                <span>
                                    <p>自愈力之-O型血饮食/运动/用药健康指南 </p>
                                    <i>你知道不同血型的人群出现的时间、地域是完…</i>
                                </span>
                                <img src={require('../../statics/images/knowledge.png')} />
                            </li>
                        </ul>
                    </div>
                </Tabs>
            </div>
        )
    }
}

export default Knowledge
