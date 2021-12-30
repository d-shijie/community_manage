import { request } from './request'
export function deleteUser(query) {
    return request({
        url: '/deleteUser',
        method: 'delete',
        data: query
    })
}
export function deleteEvent(query) {
    return request({
        url: '/eventDelete',
        data: query,
        method: 'post'
    })
}
export function deleteCommand(body) {
    return request({
        url: '/deleteCommand',
        method: 'post',
        data: body
    })
}