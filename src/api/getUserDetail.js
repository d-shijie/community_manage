import {request} from './request'
export function getUserDetail(params){
    return request({
        url:'/userDetail/'+params
    })
}