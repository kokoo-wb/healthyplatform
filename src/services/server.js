const version = ''

// 协议
const HTTP = 'http://'
const HTTPS = 'https://'

// 测试环境Server
const TEST_API_SERVER = HTTP + 'www.assetmgtcloud.com'

// 生产环境Server
const PRO_API_SERVER = HTTP + 'www.assetmgtcloud.com'


const ApiBase = {
    'localhost': TEST_API_SERVER,
    '192.168.1.4': TEST_API_SERVER,
    'www.assetmgtcloud.com': TEST_API_SERVER,
    'www.assetmgtcloud.com': PRO_API_SERVER
}

export const ApiBaseName = ApiBase[window.location.hostname];