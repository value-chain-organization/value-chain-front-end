import { axios } from '@/utils/request'

const api = {
  graphData: '/Flowsheet/Flowsheet'
}

export default api

export function getGraphData ({ id }) {
  return axios({
    url: `${api.graphData}${id}`,
    method: 'get'
  })
}
