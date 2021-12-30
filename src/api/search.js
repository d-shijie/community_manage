import { request } from './request'
export function searchEvent(title) {
    return request({
        url: '/searchEvent',
        params: {
            title
        }
    })
}