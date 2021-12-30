import { request } from './request'
export function register(data) {
    return request({
        url: '/admin/register',
        method: 'post',
        data: data
    })
}
export function login(data) {
    return request({
        url: '/admin/login',
        method: 'post',
        data: data
    })
}
export function register_user(query) {
    return request({
        url: '/register',
        data: query,
        method: 'post'
    })
}
