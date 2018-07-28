import { hashHistory } from 'react-router'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { resolve } from 'path';

export function callApi(endpoint, method = 'POST', data) {
    const header = getHeader();

    const bodySteam = JSON.stringify(data);

    let params = {
        url: endpoint,
        method: method,
        headers: header
    }

    if (data) {
        params = {
            ...params,
            data: JSON.stringify(data)
        }
    }

    return new Promise((resolve, reject) => {
        axios(params).then((res) => {
            resolve(res)
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}



function getHeader() {
    return {
        'Content-Type': 'application/json'
    };
}
