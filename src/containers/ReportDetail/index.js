import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { Icon } from 'antd-mobile'
import { observer } from 'mobx-react'

// css
import styles from './index.less'

// constants
import Store from './store.js'

@observer
class ReportDetail extends React.Component {
    static defaultProps = {
        ReportDetailStore: Store.ReportDetailStore
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }


    render() {
        const tbdata = [
            {
                ID: 1,
                illness: '肾盂炎',
                index: 0.504,
                class: 'three-degree',
                percent: 60
            },
            {
                ID: 2,
                illness: '肾盂肾炎',
                index: 0.526,
                class: 'two-degree',
                percent: 30
            },
            {
                ID: 3,
                illness: '结肠运动障碍',
                index: 0.539,
                class: 'three-degree',
                percent: 70
            },
            {
                ID: 2,
                illness: '肾盂肾炎',
                index: 0.526,
                class: 'two-degree',
                percent: 40
            },
            {
                ID: 3,
                illness: '结肠运动障碍',
                index: 0.539,
                class: 'one-degree',
                percent: 10
            },
            {
                ID: 2,
                illness: '肾盂肾炎',
                index: 0.526,
                class: 'four-degree',
                percent: 90
            },
            {
                ID: 3,
                illness: '结肠运动障碍',
                index: 0.539,
                class: 'one-degree',
                percent: 20
            }
        ]
        return (
            <div className={styles["report-detail"]}>
                <div className={styles.title}><img src={require('../../statics/images/32_title.png')} /></div>
                <div className={styles.cover}><img src={require('../../statics/images/report_detail_cover.png')} /></div>
                <div className={styles.declaration}>本检测报告属于个人隐私，他人非请勿阅</div>
                <div className={styles["user-info"]}>
                    <p>姓名：高峰</p>
                    <p>性别：男</p>
                    <p>电话号码：13810928887</p>
                    <p>检测时间：2018-03-17</p>
                    <p>检测机构：</p>
                    <p>营销员姓名：</p>
                </div>
                <div className={styles.footer}></div>
                <div className={styles["detail-title"]}>报告整体解读</div>

                <div className={styles["table-title"]}>个人基本信息</div>
                <div className={styles.table}>
                    <table className={styles["table-one"]}>
                        <tr className={styles["green-tr"]}>
                            <td>姓名：高峰</td>
                            <td>年龄：34</td>
                        </tr>
                        <tr>
                            <td>性别：男</td>
                            <td>血型：O</td>
                        </tr>
                    </table>
                </div>

                <div className={styles["table-title"]}>个人病史</div>
                <div className={styles.table}>
                    <table className={styles["table-one"]}>
                        <tr>
                            <td>器官切除项：</td>
                            <td>重大疾病史：</td>
                        </tr>
                        <tr>
                            <td>家族遗传史：</td>
                            <td>过敏史：</td>
                        </tr>
                    </table>
                </div>

                <div className={styles["table-title"]}>重点关注疾病</div>
                <div className={styles.table}>
                    <table className={styles["table-two"]}>
                        <tr className={styles["green-tr"]}>
                            <td>序号</td>
                            <td>疾病名称</td>
                            <td>概率指数</td>
                            <td>1级</td>
                            <td>2级</td>
                            <td>3级</td>
                            <td>4级</td>
                        </tr>
                        {
                            tbdata.map((item,index)=>{
                                return (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item.illness}</td>
                                        <td>{item.index}</td>
                                        <td colSpan={4}>
                                            <div className={styles.progress}><span style={{width: item.percent+'%'}} className={styles[item.class]}></span></div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>

                <div className={styles.table}>
                    <table className={styles["table-one"]}>
                        <tr className={styles["none-border"]}>
                            <td><span className={styles["four-dg"]}>4级</span>：疾病已存在或发生概率很高；</td>
                            <td><span className={styles["three-dg"]}>3级</span>：疾病正在形成阶段；</td>
                        </tr>
                        <tr className={styles["none-border"]}>
                            <td><span className={styles["two-dg"]}>2级</span>：潜在的疾病风险；</td>
                            <td><span className={styles["one-dg"]}>1级</span>：有发展趋势；</td>
                        </tr>
                    </table>
                </div>

                <div className={styles["evaluate-suggest"]}>
                    <h4>系统风险评估与建议</h4>
                    <p>压力引起的免疫力下降，建议增强体质。压力引起的免疫力下降，建议增强体质。压力引起的免疫力下降，建议增强体质。压力引起的免疫力下降，建议增强体质。</p>
                    <div className={styles.steps}>
                        <span>拨打解读热线</span>
                        <span>请自报会员</span>
                        <span>核实会员身份</span>
                        <span>确认会员需求</span>
                        <span>专业医师解读</span>
                    </div>
                </div>
                <div className={styles.footer}></div>

                <div className={styles.table}>
                    <table className={styles["table-three"]}>
                        <tr className={styles["green-tr"]}>
                            <td className={styles["organ-td"]}>消化系统--肠道</td>
                            <td className={styles["chart-td"]}>能量符号数值</td>
                            <td>不平衡部位</td>
                            <td>能量指数</td>
                        </tr>
                        <tr>
                            <td rowSpan={8}><div className={styles["report-organ"]}><img src={require('../../statics/images/report_detail_organ_one.png')} /></div></td>
                            <td rowSpan={8}>
                                <div className={styles["report-chart"]}>
                                    <span>
                                        <p><strong style={{height: '0%'}}></strong></p>
                                        <p>0</p>
                                    </span>
                                    <span>
                                        <p><strong style={{height: '0%'}}></strong></p>
                                        <p>0</p>
                                    </span>
                                    <span>
                                        <p><strong style={{height: '28%'}}></strong></p>
                                        <p>28</p>
                                    </span>
                                    <span>
                                        <p><strong style={{height: '29%'}}></strong></p>
                                        <p>29</p>
                                    </span>
                                    <span>
                                        <p><strong style={{height: '27%'}}></strong></p>
                                        <p>27</p>
                                    </span>
                                    <span>
                                        <p><strong style={{height: '0%'}}></strong></p>
                                        <p>0</p>
                                    </span>
                                </div>
                            </td>
                            <td>盲肠</td>
                            <td>0.271</td>
                        </tr>
                        <tr>
                            <td>大肠</td>
                            <td>0.283</td>
                        </tr>
                        <tr>
                            <td>空肠</td>
                            <td>0.271</td>
                        </tr>
                        <tr>
                            <td>盲肠</td>
                            <td>0.271</td>
                        </tr>
                        <tr>
                            <td>盲肠</td>
                            <td>0.271</td>
                        </tr>
                        <tr>
                            <td>盲肠</td>
                            <td>0.271</td>
                        </tr>
                        <tr>
                            <td>盲肠</td>
                            <td>0.271</td>
                        </tr>
                        <tr>
                            <td>盲肠</td>
                            <td>0.271</td>
                        </tr>
                    </table>
                </div>
                <div className={styles.table}>
                    <table className={styles["table-three"]}>
                        <tr className={styles["green-tr"]}>
                            <td>预警项目</td>
                            <td>频谱相似度D</td>
                            <td>热力学E</td>
                            <td>T值</td>
                            <td>A值</td>
                            <td>预警等级</td>
                        </tr>
                        <tr>
                            <td>结肠运动障碍</td>
                            <td>0.539</td>
                            <td>7</td>
                            <td>1</td>
                            <td><span className={styles["red-dot"]}>●</span></td>
                            <td><span className={styles["degree-3"]}>3级</span></td>
                        </tr>
                        <tr>
                            <td>结肠运动障碍</td>
                            <td>0.539</td>
                            <td>7</td>
                            <td>1</td>
                            <td><span className={styles["red-dot"]}>●</span></td>
                            <td><span className={styles["degree-2"]}>2级</span></td>
                        </tr>
                        <tr>
                            <td>结肠运动障碍</td>
                            <td>0.539</td>
                            <td>7</td>
                            <td>1</td>
                            <td>--</td>
                            <td><span className={styles["degree-1"]}>1级</span></td>
                        </tr>
                        <tr>
                            <td>结肠运动障碍</td>
                            <td>0.539</td>
                            <td>7</td>
                            <td>1</td>
                            <td><span className={styles["red-dot"]}>●</span></td>
                            <td><span className={styles["degree-4"]}>4级</span></td>
                        </tr>
                    </table>
                </div>
                <div className={styles.instruction}>
                    <div className={styles["instruction-box"]}>
                        <h4>预警指标说明</h4>
                        <div className={styles["instruction-one"]}>
                            <span><img src={require('../../statics/images/report_detail_one.png')}/>表示：细胞功能处于最佳健康状态；</span>
                            <span><img src={require('../../statics/images/report_detail_two.png')}/>表示：细胞功能处于最佳健康状态；</span>
                            <span><img src={require('../../statics/images/report_detail_three.png')}/>表示：细胞功能处于最佳健康状态；</span>
                            <span><img src={require('../../statics/images/report_detail_four.png')}/>表示：细胞功能处于最佳健康状态；</span>
                            <span><img src={require('../../statics/images/report_detail_five.png')}/>表示：细胞功能处于最佳健康状态；</span>
                            <span><img src={require('../../statics/images/report_detail_six.png')}/>表示：细胞功能处于最佳健康状态；</span>
                        </div>
                        <h4>预警等级说明</h4>
                        <div className={styles["instruction-two"]}>
                            <span><strong>4级</strong>表示：细胞功能处于最佳健康状态；</span>
                            <span><strong>3级</strong>表示：细胞功能处于最佳健康状态；</span>
                            <span><strong>2级</strong>表示：细胞功能处于最佳健康状态；</span>
                            <span><strong>1级</strong>表示：细胞功能处于最佳健康状态；</span>
                        </div>
                        <h4>声明</h4>
                        <div className={styles["instruction-three"]}>
                            <p>1、本报告图片为数字模拟图片，将更好的表现数据的可读性，提示的紧张、敏感问题仅供参考，不具备疾病诊断的功能；</p>
                            <p>2、微磁健康筛选查不同于医院体检，是对检测者整体健康状况的全面测评，健康预警具有健康唤醒，健康教育的功能和意义；</p>
                            <p>3、本报告仅供检测者进行健康指导参考</p>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}></div>

                <div className={styles.table}>
                    <table className={styles["table-three"]}>
                        <tr className={styles["green-tr"]}>
                            <td className={styles["organ-td"]}>消化系统--肠道</td>
                            <td className={styles["chart-td"]}>能量符号数值</td>
                            <td>不平衡部位</td>
                            <td>能量指数</td>
                        </tr>
                        <tr>
                            <td rowSpan={8}><div className={styles["report-organ"]}><img src={require('../../statics/images/report_detail_organ_one.png')} /></div></td>
                            <td rowSpan={8}>
                                <div className={styles["report-chart"]}>
                                    <span>
                                        <p><strong style={{height: '0%'}}></strong></p>
                                        <p>0</p>
                                    </span>
                                    <span>
                                        <p><strong style={{height: '0%'}}></strong></p>
                                        <p>0</p>
                                    </span>
                                    <span>
                                        <p><strong style={{height: '28%'}}></strong></p>
                                        <p>28</p>
                                    </span>
                                    <span>
                                        <p><strong style={{height: '29%'}}></strong></p>
                                        <p>29</p>
                                    </span>
                                    <span>
                                        <p><strong style={{height: '27%'}}></strong></p>
                                        <p>27</p>
                                    </span>
                                    <span>
                                        <p><strong style={{height: '0%'}}></strong></p>
                                        <p>0</p>
                                    </span>
                                </div>
                            </td>
                            <td>盲肠</td>
                            <td>0.271</td>
                        </tr>
                        <tr>
                            <td>盲肠</td>
                            <td>0.271</td>
                        </tr>
                        <tr>
                            <td>盲肠</td>
                            <td>0.271</td>
                        </tr>
                        <tr>
                            <td>盲肠</td>
                            <td>0.271</td>
                        </tr>
                        <tr>
                            <td>盲肠</td>
                            <td>0.271</td>
                        </tr>
                        <tr>
                            <td>盲肠</td>
                            <td>0.271</td>
                        </tr>
                        <tr>
                            <td>盲肠</td>
                            <td>0.271</td>
                        </tr>
                        <tr>
                            <td>盲肠</td>
                            <td>0.271</td>
                        </tr>
                    </table>
                </div>
                <div className={styles.table}>
                    <table className={styles["table-three"]}>
                        <tr className={styles["green-tr"]}>
                            <td>预警项目</td>
                            <td>频谱相似度D</td>
                            <td>热力学E</td>
                            <td>T值</td>
                            <td>A值</td>
                            <td>预警等级</td>
                        </tr>
                        <tr>
                            <td>结肠运动障碍</td>
                            <td>0.539</td>
                            <td>7</td>
                            <td>1</td>
                            <td><span className={styles["red-dot"]}>●</span></td>
                            <td><span className={styles["degree-3"]}>3级</span></td>
                        </tr>
                        <tr>
                            <td>结肠运动障碍</td>
                            <td>0.539</td>
                            <td>7</td>
                            <td>1</td>
                            <td><span className={styles["red-dot"]}>●</span></td>
                            <td><span className={styles["degree-3"]}>3级</span></td>
                        </tr>
                        <tr>
                            <td>结肠运动障碍</td>
                            <td>0.539</td>
                            <td>7</td>
                            <td>1</td>
                            <td>--</td>
                            <td><span className={styles["degree-3"]}>3级</span></td>
                        </tr>
                        <tr>
                            <td>结肠运动障碍</td>
                            <td>0.539</td>
                            <td>7</td>
                            <td>1</td>
                            <td>--</td>
                            <td><span className={styles["degree-3"]}>3级</span></td>
                        </tr>
                    </table>
                </div>
                <div className={styles.instruction}>
                    <div className={styles["instruction-box"]}>
                        <h4>预警指标说明</h4>
                        <div className={styles["instruction-one"]}>
                            <span><img src={require('../../statics/images/report_detail_one.png')}/>表示：细胞功能处于最佳健康状态；</span>
                            <span><img src={require('../../statics/images/report_detail_two.png')}/>表示：细胞功能处于最佳健康状态；</span>
                            <span><img src={require('../../statics/images/report_detail_three.png')}/>表示：细胞功能处于最佳健康状态；</span>
                            <span><img src={require('../../statics/images/report_detail_four.png')}/>表示：细胞功能处于最佳健康状态；</span>
                            <span><img src={require('../../statics/images/report_detail_five.png')}/>表示：细胞功能处于最佳健康状态；</span>
                            <span><img src={require('../../statics/images/report_detail_six.png')}/>表示：细胞功能处于最佳健康状态；</span>
                        </div>
                        <h4>预警等级说明</h4>
                        <div className={styles["instruction-two"]}>
                            <span><strong>4级</strong>表示：细胞功能处于最佳健康状态；</span>
                            <span><strong>3级</strong>表示：细胞功能处于最佳健康状态；</span>
                            <span><strong>2级</strong>表示：细胞功能处于最佳健康状态；</span>
                            <span><strong>1级</strong>表示：细胞功能处于最佳健康状态；</span>
                        </div>
                        <h4>声明</h4>
                        <div className={styles["instruction-three"]}>
                            <p>1、本报告图片为数字模拟图片，将更好的表现数据的可读性，提示的紧张、敏感问题仅供参考，不具备疾病诊断的功能；</p>
                            <p>2、微磁健康筛选查不同于医院体检，是对检测者整体健康状况的全面测评，健康预警具有健康唤醒，健康教育的功能和意义；</p>
                            <p>3、本报告仅供检测者进行健康指导参考</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReportDetail
