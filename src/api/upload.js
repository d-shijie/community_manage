import { request } from './request'
export function upload(formdata) {
    return request({
        url: '/uploadAvator',
        data: formdata,
        method: 'post'
    })
}
export function updateUser(query) {
    return request({
        url: '/userDetail',
        method: 'post',
        data: query
    })
}
export function updateEvent(formdata) {
    return request({
        url: '/updateEvent',
        method: 'post',
        data: formdata
    })
}
