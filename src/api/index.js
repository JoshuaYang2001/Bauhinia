import request from './request'

export const getUserCountApi = ()=> {
    return request({
        url: '/user/count',
        method: 'GET',
    })
}

export const loginApi = (data)=> {
    return request({
        url: '/user/login',
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        data
    })
}

export const registerApi = (data)=> {
    return request({
        url: '/user/register',
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        data
    })
}