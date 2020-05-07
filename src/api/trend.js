import api from './index'
import { axios } from '@/utils/request'

export function getTrendData ({ id, startT, endT }) {
  return axios({
    url: `${api.trendData}${id}`,
    method: 'get',
    params: { startT, endT }
  })
}
