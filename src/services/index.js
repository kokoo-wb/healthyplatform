import { ApiBaseName } from "./server"
import { callApi } from './callApi'

// 量子检测预约提交接口函数
export const appointment = (data) => callApi(ApiBaseName + '/jeesite/htjk/apphealthjk/goinorder', 'POST', data)

// 全国检测点接口获取函数
export const checkpoint = (data) => callApi(ApiBaseName + '/jeesite/htjk/apphealthjk/checkpoint', 'POST',data)

// 登录
export const login = (data) => callApi(ApiBaseName + '/jeesite/htjk/apphealthjk/loginPeople', 'POST', data)

// 登出
export const loginOut = (data) => callApi(ApiBaseName + '/jeesite/htjk/apphealthjk/quitPeople', 'POST', data)

// 注册
export const register = (data) => callApi(ApiBaseName + '/jeesite/htjk/apphealthjk/registerPeople', 'POST', data)

// 获取短信验证码
export const getSmsCode = (data) => callApi(ApiBaseName + '/jeesite/htjk/apphealthjk/registerUser', 'POST', data)

// 体质自检
export const selfcheck = (data) => callApi(ApiBaseName + '/jeesite/htjk/apphealthjk/userjk', 'POST', data)

// 微信网页授权
export const auth = (data) => callApi(ApiBaseName + '/jeesite/htjk/apphealthjk/auth', 'POST', data)

// 饮食建议
export const foodAdvice = (data) => callApi(ApiBaseName + '/jeesite/htjk/apphealthjk/foodAdvice', 'POST', data)

// 参加体质检测人数获取
export const bodyCheckSum = (data) => callApi(ApiBaseName + '/jeesite/htjk/apphealthjk/bodyCheckSum', 'POST',data)

// 修改个人资料
export const updateUserInfo = (data) => callApi(ApiBaseName + '/jeesite/htjk/apphealthjk/modifyUserInfo', 'POST', data)

// 获取后台个人信息
export const getUserInfo = (data) => callApi(ApiBaseName + '/jeesite/htjk/apphealthjk/getUserInfo', 'POST', data)

// 修改密码
export const changePwd = (data) => callApi(ApiBaseName + '/jeesite/htjk/apphealthjk/modifyUserPassword', 'POST', data)

//  修改手机
export const modifyPhone = (data) => callApi(ApiBaseName + '/jeesite/htjk/apphealthjk/modifyUserPassword', 'POST', data)

// 忘记密码
export const forgetPwd = (data) => callApi(ApiBaseName +'/jeesite/htjk/apphealthjk/forgivePassword','POST',data)
