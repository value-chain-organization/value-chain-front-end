import { axios } from '@/utils/request'

const api = {
  analyseTBM: '/DataCenterSP/UpdateDB',
  getTableData: '/DataCenterSP/QueryConfig',
  updateConfig: '/DataCenterSP/UpdateConfig',
  showTable: '/DataCenterSP/QueryTableTag',
  updateValue: '/DataCenterSP/UpdateSingleValue'
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