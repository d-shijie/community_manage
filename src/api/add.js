import {request} from './request'
export function addEvent(formdata){
 return request({
     url:'/publish',
     data:formdata,
     method:'post'
 })
}