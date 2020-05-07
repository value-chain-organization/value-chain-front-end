import { axios } from '@/utils/request'

const api = {
  analyseTBM: '/DataCenter/UpdateDB',
  getTableData: '/DataCenter/QueryConfig',
  updateConfig: '/DataCenter/UpdateConfig',
  showTable: '/DataCenter/QueryTableTag',
  updateValue: '/DataCenter/UpdateSingleValue',
}

export function analyseTBM () {
  return axios({
    url: api.analyseTBM,
    method: 'get'
  })
}

export function getTableData ({ dataType }) {
  return axios({
    url: api.getTableData,
    params: { dataType },
    method: 'get'
  })
}

export function updateConfig ({ dataType, configObjList }) {
  return axios({
    url: api.updateConfig,
    data: { dataType, configObjList },
    method: 'post'
  })
}

export function showTable ({ dataType }) {
  return axios({
    url: api.showTable,
    params: { dataType },
    method: 'get'
  })
}

export function updateValue ({ tagName, newValue }) {
  return axios({
    url: api.updateValue,
    data: { tagName, newValue },
    method: 'post'
  })
}