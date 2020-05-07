import { axios } from '@/utils/request'

const api = {
  GetCX: '/CutOil/GetCX', // 获取基本信息
  GetConf: '/CutOil/GetConf', // 保存配置
  SortOil: '/CutOil/SortOil', // 回传搜索条目
  GetFeedOil: '/CutOil/GetFeedOil', // 添加原油后的确认按钮
  GetCutOilFwd: '/CutOil/GetCutOilFwd', // 右下切割按钮
  GetMatchTandY: '/CutOil/GetMatchTandY', // 右下匹配按钮
  GetAllCut: '/CutOil/GetAllCut', // 模拟切割
  Assay: '/Download/Assay', // 获取文件列表
  DownloadAssay: '/Download/DownloadAssay', // 下载文件,
  getOilList: '/CutOil/getOilList'// 选择原油下拉框
}

export default {
  GetCX ({ cA }) {
    return axios({
      url: api.GetCX,
      params: { cA },
      method: 'get'
    })
  },
  GetConf (configObj) {
    return axios({
      url: api.GetConf,
      data: configObj,
      method: 'post'
    })
  },
  getOilList () {
    return axios({
      url: api.getOilList,
      method: 'get'
    })
  },
  SortOil (data) {
    return axios({
      url: api.SortOil,
      data,
      method: 'post'
    })
  },
  GetFeedOil (data) {
    return axios({
      url: api.GetFeedOil,
      data,
      method: 'post'
    })
  },
  GetCutOilFwd (data) {
    return axios({
      url: api.GetCutOilFwd,
      data,
      method: 'post'
    })
  },
  GetAllCut (data) {
    return axios({
      url: api.GetAllCut,
      data,
      method: 'post'
    })
  },
  GetMatchTandY (data) {
    return axios({
      url: api.GetMatchTandY,
      data,
      method: 'post'
    })
  },
  Assay () {
    return axios({
      url: api.Assay,
      method: 'post'
    })
  },
  DownloadAssay (fileName) {
    return axios({
      url: api.DownloadAssay,
      params: fileName,
      method: 'get'
    })
  }
}
