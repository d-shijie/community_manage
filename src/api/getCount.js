import { request } from './request'
export function getCount() {
    return request({
        url: '/count'
    })
}
export function getEvent(id) {
    return request({
        url: '/event',
        params: {
            id
        }
    })
}
export function getCommands(id) {
    return request({
        url: '/command',
        params: {
            id
        }
    })
}