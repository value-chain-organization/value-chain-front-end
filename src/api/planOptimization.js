import api from './index'
import { axios } from '@/utils/request'

export function requestGetJiChuShuJu (params, isShort) {
  return axios({
    url: !isShort ? api.PIMSModelJiChuShuJu : api.PIMSModelSPJiChuShuJu,
    method: 'get',
    params: params
  })
}

export function requestGetTaskLogJiChu (data, isShort) {
  return axios({
    url: !isShort ? api.PIMSModelTaskLogJiChu : api.PIMSModelSPTaskLogJiChu,
    method: 'post',
    data: data
  })
}

export function requestCancelTask (params, isShort) {
  return axios({
    url: !isShort ? api.PIMSModelCancelTask : api.PIMSModelSPCancelTask,
    method: 'post',
    data: params
  })
}

export function requestJiaoHe (params, isShort) {
  return axios({
    url: !isShort ? api.PIMSModelJiaoHe : api.PIMSModelSPJiaoHe,
    method: 'post',
    data: params
  })
}

export function requestGetTaskLogJiaoHe (data, isShort) {
  return axios({
    url: !isShort ? api.PIMSModelTaskLogJiaoHe : api.PIMSModelSPTaskLogJiaoHe,
    method: 'post',
    data: data
  })
}

export function requestYouHua (params, isShort) {
  return axios({
    url: !isShort ? api.PIMSModelYouHua : api.PIMSModelSPYouHua,
    method: 'get',
    params: params
  })
}

export function requestGetTaskLogYouHua (data, isShort) {
  return axios({
    url: !isShort ? api.PIMSModelTaskLogYouHua : api.PIMSModelSPTaskLogYouHua,
    method: 'post',
    data: data
  })
}

export function requestGetPIMSExecLog (params, isShort) {
  return axios({
    url: !isShort ? api.PIMSModelGetPIMSExecLog : api.PIMSModelSPGetPIMSExecLog,
    method: 'get',
    params: params
  })
}

export function requestGetCache (params, isShort) {
  return axios({
    url: !isShort ? api.PIMSModelGetCache : api.PIMSModelSPGetCache,
    method: 'get',
    params: params
  })
}

export function requeseOpeartePIMSData (params, isShort) {
  return axios({
    url: !isShort ? api.PIMSModelOpeartePIMSData : api.PIMSModelSPOpeartePIMSData,
    method: 'post',
    data: params
  })
}

export function requestBackupDB () {
  return axios({
    url: api.PIMSModelBackupDB,
    method: 'get'
  })
}

export function requestRecoverDB () {
  return axios({
    url: api.PIMSModelRecoverDB,
    method: 'get'
  })
}

export function genPlanReport (data, isShort) {
  return axios({
    url: !isShort ? api.PIMSModelGenPlanReport : api.PIMSModelSPGenPlanReport,
    data: data,
    method: 'post'
  })
}

export function getTaskLog ({username, guid}, isShort) {
  return axios({
    url: !isShort ? api.PIMSModelGetTaskLog : api.PIMSModelSPGetTaskLog,
    data: {username, guid},
    method: 'post'
  })
}