import api from './index'
import { axios } from '@/utils/request'

// export function getProgramList (username) {
//   return axios({
//     url: api.getProgramList,
//     method: 'get',
//     params: { username: username }
//   })
// }
export function getProgramList () {
  return axios({
    url: api.getProgramList,
    method: 'get'
  })
}

export function analysisReport (fileName) {
  return axios({
    url: api.analysisReport,
    method: 'get',
    params: { filename: fileName }
  })
}

export function getFileList () {
  return axios({
    url: api.getReportFileList,
    method: 'get'
  })
}

export function getSheetList (folder, file) {
  return axios({
    url: api.getReportSheetList,
    method: 'post',
    data: { requestfolder: folder, requestfile: file }
  })
}

export function getSheetPreview (folder, file, sheet) {
  return axios({
    url: api.getReportSheetPreview,
    method: 'post',
    data: { requestfolder: folder, requestfile: file, requessheet: sheet }
  })
}

export function deleteFile (folder, file) {
  return axios({
    url: api.deleteReportFile,
    method: 'post',
    data: { requestfolder: folder, requestfile: file }
  })
}
